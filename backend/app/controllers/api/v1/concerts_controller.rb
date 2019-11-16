# frozen_string_literal: true

module Api
  module V1
    class ConcertsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create update destroy]
      before_action :admin?, only: %i[create update destroy]
      before_action :set_concert, only: %i[show update destroy]

      def index
        @concerts = Concert.all
        render json: ConcertSerializer.new(@concerts).serializable_hash
      end

      def show
        options = { include: [:events] }
        render json: ConcertSerializer.new(@concert, options).serializable_hash
      end

      def create
        @concert = Concert.new(concert_params)

        if @concert.save
          render json: ConcertSerializer.new(@concert).serializable_hash, status: :created
        else
          render json: { error: @concert.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def update
        if @concert.update(concert_params)
          render json: ConcertSerializer.new(@concert).serializable_hash, status: :ok
        else
          render json: { error: @concert.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def destroy
        if @concert.delete
          render json: { message: 'Successfully delete concert' }, status: :no_content
        else
          render json: { error: @concert.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def concert_params
        params.require(:concert).permit(:name, :description, photos: [])
      end

      def set_concert
        @concert = Concert.find(params[:id])
      end
    end
  end
end
