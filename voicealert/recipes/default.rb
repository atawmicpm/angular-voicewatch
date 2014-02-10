#
# Cookbook Name:: voicealert
# Recipe:: default
#
# Copyright (C) 2014 YOUR_NAME
# 
# All rights reserved - Do Not Redistribute
#

include_recipe "ubuntu"
include_recipe "rvm::system"

packages = %w(zabbix-agent redis-server nginx)

packages.each do |name|
  package name do
    action :install
  end
end

user "voicealert" do
  supports :manage_home => true
  home "#{node['voicealert']['home_dir']}"
  shell "/bin/bash"
  password "$1$sbO9GkPI$tsQGhbcb6BpRRvHtKeUGI0"
end


template "/etc/init/sidekiq.conf" do
  source "sidekiq.conf.erb"
  mode "0644"
  owner "root"
  group "root"
end


service "sidekiq" do
  provider Chef::Provider::Service::Upstart
  supports :status => true, :restart => true, :reload => true
  action [:enable, :start]
end
