class Mcp < ActiveRecord::Base
  has_many :tests

  attr_accessible :ip_address
end
