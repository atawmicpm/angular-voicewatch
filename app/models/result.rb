require 'open-uri'

class Result < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  belongs_to :test

  attr_accessible :log, :recording

  def time_ago
    time_ago_in_words(self.updated_at)
  end

  def email(sounds)
    test = self.test
    errors = 0
    test.results[-3..-1].each do |result|
      errors += result.status.to_i
    end

    mp3 = "#{test.results.last.id}.mp3"
    path = sounds

    if errors > 1
      setting = Setting.last
      mail = Mail.new do
        from     'voicealert@genesyscloud.com'
        to       setting.email
        subject  "VoiceAlert error - #{test.phone_number} failed 2+ of 3 last tests"
        body     "error!"
        add_file :filename => "#{mp3}", :content => File.read("#{path}/#{mp3}")
      end

      Mail.defaults do
        delivery_method :smtp, address: setting.smtp, port: 1025
      end

      mail.deliver!
    end

  end


  def get
    # call sip:+18558435355@10.51.33.166:5054 18554120839 http://10.51.28.54:1433/vwra.php?result_id=999999 999999
    mcp_ip = self.test.mcp.ip_address
    mcp_port = 1433
    url = "http://#{mcp_ip}:#{mcp_port}/"
    # snippet = ''

    # Read result log from server
    log = open(url + "#{self.id}.log").read.gsub!(/\d{2}-\d{2}-\d{2}.* : /, '')
    self.log = log

    if log =~ /(Error.*)\n/
      self.snippet = $1
    elsif log =~ /(Prompt Duration.*\nVWRA.*)/
     self.snippet = $1.to_s.gsub!(/\n/, '')
    else
      self.snippet = "Unknown snippet, please review log"
    end
    
    # Determine the session ID from the log
    /Session ID: (.*) \n/.match(log)
    session_id = $1

    if log =~ /Error/
      self.status = 1
      self.test.status += 1
      self.test.save
    else
      self.status = 0
      self.test.status = 0
      self.test.save
    end

    # Parse directory listing for wav file name
    # callrec.006F012E-08004BA1.140201003134.wav
    listing = open(url).read
    /(callrec.#{session_id}.*.wav)"/.match(listing)
    wav = $1

    sounds = "/Users/pmispagel/Desktop/dev/voicewatch/app/assets/sounds"
    # Save the wav file locally
    File.open("#{sounds}/#{self.id}.wav", "wb") do |saved_wav|
      open("#{url}#{wav}", "rb") do |wav_file|
        saved_wav.write(wav_file.read)
      end
    end

    system "sox #{sounds}/#{self.id}.wav -e signed-integer #{sounds}/#{self.id}s.wav"
    system "lame -V0 #{sounds}/#{self.id}s.wav #{sounds}/#{self.id}.mp3"
    system "rm -rf #{sounds}/#{self.id}.wav"
    system "rm -rf #{sounds}/#{self.id}s.wav"

    # update the wav file URL in database
    self.recording = "/assets/#{self.id}.mp3"

    # save result information to database
    self.save

    self.email(sounds) if self.status > 0

  end



end
