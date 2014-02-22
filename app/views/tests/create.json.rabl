collection @tests

attributes :id, :phone_number, :status, :created_at

node do |test|
  {
    :created_at_formatted => test.created_at.strftime("%m/%d/%Y"),
    :updated_at_formatted => time_ago_in_words(test.updated_at),
    :stats => test.stats(1),
    :stats24 => test.stats(24),
    :stats24x7 => test.stats(24*7)
  }
end

child :tenant do
  attributes :id, :name
end

child :mcp do
  attributes :id, :ip_address
end