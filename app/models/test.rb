require 'net/telnet'

class Test < ActiveRecord::Base
  belongs_to :tenant
  belongs_to :mcp
  has_many :results

  attr_accessible :phone_number, :status, :tenant_id, :mcp_id

  def tenant_stats hours
    tenant      = self.tenant
    mcp         = self.mcp
    disconnects = 0
    failures    = 0
    successes   = 0
    s_percentage = 0
    f_percentage = 0
    d_percentage = 0

    tenant.tests.each {|test| 
      test.results.where(updated_at: hours.hour.ago..DateTime.now).each {|result| 
        if result.status
          failures    += 1 if result.status.to_i == 1
          successes   += 1 if result.status.to_i == 0  
        else
          disconnects += 1
        end
      }
    }
    
    total = successes + failures + disconnects

    s_percentage = (successes.to_f / total * 100).to_i unless successes == 0
    f_percentage = (failures.to_f / total * 100).to_i unless failures == 0
    d_percentage = (disconnects.to_f / total * 100).to_i unless disconnects == 0

    [successes, failures, disconnects, s_percentage, f_percentage, d_percentage]
  end

  def mcp_stats hours
    mcp         = self.mcp
    disconnects = 0
    failures    = 0
    successes   = 0
    s_percentage = 0
    f_percentage = 0
    d_percentage = 0

    mcp.tests.each {|test| 
      test.results.where(updated_at: hours.hour.ago..DateTime.now).each {|result|
        if result.status
          failures    += 1 if result.status.to_i == 1
          successes   += 1 if result.status.to_i == 0  
        else
          disconnects += 1
        end

      }
    }
    
    total = successes + failures + disconnects

    s_percentage = (successes.to_f / total * 100).to_i unless successes == 0
    f_percentage = (failures.to_f / total * 100).to_i unless failures == 0
    d_percentage = (disconnects.to_f / total * 100).to_i unless disconnects == 0

    [successes, failures, disconnects, s_percentage, f_percentage, d_percentage]
  end

  def stats hours
    results       = self.results.where(updated_at: hours.hour.ago..DateTime.now)
    failures      = 0
    successes     = 0
    s_percentage  = 0
    f_percentage  = 0

    unless results.empty?
      results.each {|result|
        if result.status
          failures += 1 if result.status.to_i == 1
          successes += 1 if result.status.to_i == 0
        end
      }

      total = successes + failures

      s_percentage = (successes.to_f / total * 100).to_i unless successes == 0
      f_percentage = (failures.to_f / total * 100).to_i unless failures == 0
    end

    [s_percentage, f_percentage, successes, failures]
  end
  
  def run
    # call sip:+18558435355@10.51.33.166:5054 18554120839 file:///usr/local/genesys/vwra/vwra.vxml 123
    result    = self.results.create
    phone     = self.phone_number
    mcp_ip    = self.mcp.ip_address
    mcp_port  = 3389

    p file      = "http://#{mcp_ip}:1433/vwra.php?result_id=#{result.id}"
    p request   = "call sip:#{phone}@10.51.33.166:5054 18554120839 #{file} #{result.id}"

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
