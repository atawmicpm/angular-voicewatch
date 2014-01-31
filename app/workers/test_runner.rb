class TestRunner
  include Sidekiq::Worker

  def perform(test_id)
    test = Test.find(test_id)
    test.run
    puts "submitting test to sidekiq: #{test}"
  end
end
