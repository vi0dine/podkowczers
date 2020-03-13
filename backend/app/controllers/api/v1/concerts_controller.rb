# frozen_string_literal: true

module Api
  module V1
    class ConcertsController < ApplicationController
      before_action :doorkeeper_authorize!
      load_and_authorize_resource

      api!
      def index; end

      api!
      def show; end

      api!
      def create
        if @concert.save
          render 'create', status: :created
        else
          render json: { error: @concert.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      api!
      def update
        if @concert.update(concert_params)
          render 'create', status: :ok
        else
          render json: { error: @concert.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      api!
      def destroy
        if @concert.delete
          render 'create', status: :ok
        else
          render json: { error: @concert.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def concert_params
        params.require(:concert).permit(:name, :description, photos: [])
      end
    end
  end
end
