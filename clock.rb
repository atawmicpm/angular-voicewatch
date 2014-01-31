require 'clockwork'
require './config/boot'
require './config/environment'


module Clockwork
  handler do |job|
    puts "Running #{job}"
  end

  tests = Test.all

  every(10.seconds, 'tests.submit') {
    tests.each do |test|
      puts "Test ID: #{test.id}"
      TestRunner.perform_async(test.id)
    end
  }

end
