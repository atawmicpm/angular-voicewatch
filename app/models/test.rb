require 'net/telnet'

class Test < ActiveRecord::Base
  belongs_to :tenant
  belongs_to :mcp
  has_many :results

  attr_accessible :phone_number, :frequency, :tenant_id, :mcp_id

  def print_frequency
    "every #{frequency} minutes"
  end
  
  def run
    result = self.results.create
    phone = self.phone_number
    mcp_ip = self.mcp.ip_address
    mcp_port = 3389


    request = "call sip:#{phone}@10.51.33.166:5054 18554120839 file:///usr/local/genesys/vwra/vwra.vxml #{result.id}"

    p mcp_ip
    p mcp_port
    p request

    mcp = Net::Telnet::new(
      "Host" => mcp_ip,
      "Port" => mcp_port,
      "Output_log"    => 'output.log'
    )

    mcp.cmd(request)
    # call sip:+18558435355@10.51.33.166:5054 18554120839 file:///usr/local/genesys/vwra/vwra.vxml 123
 

  end



end
