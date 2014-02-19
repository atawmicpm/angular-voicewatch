class SettingsController < ApplicationController

  skip_before_filter :verify_authenticity_token
  respond_to :json

  def show
    @setting = Setting.last
  end

  def create
    @setting = Setting.create(smtp: params[:smtp], email: params[:email])
  end

end
