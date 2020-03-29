module Api
  module V1
    class AdminController < ApplicationController
      before_action :doorkeeper_authorize!
    end
  end
end