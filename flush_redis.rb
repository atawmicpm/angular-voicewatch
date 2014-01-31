require 'sidekiq'

Sidekiq.redis { |r|
    r.flushall
    queue = r.lrange "queue:default", 0, -1
    puts "Redis queue flushed: #{queue}"
}
