collection @tests

attributes :id, :phone_number, :status, :created_at

node do |test|
  {
    :created_at_formatted => test.created_at.strftime("%m/%d/%Y"),
    :updated_at_formatted => time_ago_in_words(test.updated_at)
  }
end

child :tenant do
  attributes :id, :name
end

child :mcp do
  attributes :id, :ip_address
end