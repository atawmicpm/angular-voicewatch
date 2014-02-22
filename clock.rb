require 'clockwork'
require './config/boot'
require './config/environment'


module Clockwork
  handler do |job|
    puts "Running #{job}"
  end


  every(5.minutes, 'tests.submit') {
    tests = Test.all
    tests.each do |test|
      puts "Test ID: #{test.id}"
      TestRunner.perform_async(test.id)

      # if test.status > 1
      #   Emailer.perform_async(test.id)
      # end
    end
  }

end
