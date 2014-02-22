class Emailer
  include Sidekiq::Worker

  def perform(test_id)
    test = Test.find(test_id)
    errors = 0
    test.results[-3..-1].each do |result|
      errors += result.status.to_i
    end

    mp3 = "#{test.results.last.id}.mp3"
    path = '/Users/pmispagel/Desktop/dev/voicewatch/app/assets/sounds'
    #path = '/home/voicealert/app/public/sounds'

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
end
