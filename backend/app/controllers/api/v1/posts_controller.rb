# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :doorkeeper_authorize!
      load_and_authorize_resource

      api!

      def index; end

    end
  end
end
