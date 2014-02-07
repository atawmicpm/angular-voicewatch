require 'net/telnet'

class Test < ActiveRecord::Base
  belongs_to :tenant
  belongs_to :mcp
  has_many :results

  attr_accessible :phone_number, :status, :tenant_id, :mcp_id

  def print_frequency
    "every #{frequency} minutes"
  end
  
  def run
    # call sip:+18558435355@10.51.33.166:5054 18554120839 file:///usr/local/genesys/vwra/vwra.vxml 123
    result    = self.results.create
    phone     = self.phone_number
    mcp_ip    = self.mcp.ip_address
    mcp_port  = 3389

    file      = "http://#{mcp_ip}:1433/vwra.php?result_id=#{result.id}"
    request   = "call sip:#{phone}@10.51.33.166:5054 18554120839 #{file} #{result.id}"

    p file
    p request

    mcp = Net::Telnet::new(
      "Host"          => mcp_ip,
      "Port"          => mcp_port,
      "Output_log"    => 'output.log'
    )

    mcp.cmd(request)

    mcp.waitfor({
      "Match"         => /CALL_DROP/,
      "Timeout"       => 120
    })
    
    p result.get
  end

end
