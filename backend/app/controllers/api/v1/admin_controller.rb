module Api
  module V1
    class AdminController < ApplicationController
      before_action :doorkeeper_authorize!

      def stats
        @stats =
      end
    end
  end
end