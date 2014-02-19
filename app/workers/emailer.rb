class Emailer
  include Sidekiq::Worker

  def perform(test_id)
    test = Test.find(test_id)
    errors = 0
    test.results[-3..-1].each do |result|
      errors += result.status if result.status
    end

    if errors > 1
      setting = Setting.last
      mail = Mail.new do
        from     'voicealert@genesyscloud.com'
        to       setting.email
        subject  'VoiceAlert ERROR!'
        body     "error!"
        # add_file :filename => 'something.mp3', :content => File.read('/')
      end

      Mail.defaults do
        delivery_method :smtp, address: setting.smtp, port: 1025
      end

      mail.deliver!
    end

  end
end
