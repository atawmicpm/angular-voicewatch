class Test < ActiveRecord::Base
  belongs_to :tenant
  belongs_to :mcp
  has_many :results

  attr_accessible :phone_number, :frequency, :tenant_id, :mcp_id

  def print_frequency
    "every #{frequency} minutes"
  end
  
end
