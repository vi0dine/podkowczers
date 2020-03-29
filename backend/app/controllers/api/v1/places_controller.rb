module Api
  module V1
    class PlacesController < ApplicationController
      before_action :doorkeeper_authorize!
      load_and_authorize_resource

      def index; end
    end
  end
end