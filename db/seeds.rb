# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# 10.51.28.54

mcps = Mcp.create([
  {ip_address: '10.51.28.54'}
  ])

tenants = Tenant.create([
  {name: 'Phillip Home'}, 
  {name: 'Genesys'}
  ])

tests = Test.create([
  {phone_number: '+15105073681', tenant_id: Tenant.first.id, mcp_id: Mcp.first.id, status: 0},
  {phone_number: '+18558435355', tenant_id: Tenant.last.id, mcp_id: Mcp.first.id, status: 0},
  ])

