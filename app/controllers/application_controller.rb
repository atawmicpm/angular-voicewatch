class ApplicationController < ActionController::Base
  include SeamlessDatabasePool::ControllerFilter
  use_database_pool :all => :persistent, [:create, :update, :destroy] => :master
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
end
