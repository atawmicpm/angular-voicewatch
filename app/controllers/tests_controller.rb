class TestsController < ApplicationController

  skip_before_filter :verify_authenticity_token

  respond_to :json

  def index
    @tests = Test.all
  end

  def create
    mcp = Mcp.find_or_create_by(ip_address: params[:mcp])
    tenant = Tenant.find_or_create_by(name: params[:tenant])

    test = Test.find_or_create_by(
      phone_number: params[:phone_number],
      tenant_id: tenant.id,
      mcp_id: mcp.id
    )

    @tests = Test.all
  end
  
  def show
    @test = Test.find(params[:id])
  end

end
