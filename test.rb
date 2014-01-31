require './config/boot'
require './config/environment'

tests = Test.all
tests.each do |test|
	test.run
end

