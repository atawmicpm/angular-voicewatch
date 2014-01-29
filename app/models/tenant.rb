class Tenant < ActiveRecord::Base
  has_many :tests

  attr_accessible :name
  
end
