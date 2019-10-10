# frozen_string_literal: true

module Api
  module V1
    class ConcertsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create destroy]
      before_action :admin?, only: %i[create destroy]

      def index
        @concerts = Concert.all
        render json: ConcertSerializer.new(@concerts).serializable_hash
      end

      def show
        @concert = Concert.find(params[:id])
        render json: ConcertSerializer.new(@concert).serializable_hash
      end

      def create
        concert = Concert.new(concert_params)

        if concert.save
          render json: ConcertSerializer.new(concert).serializable_hash, status: :created
        else
          render json: { error: concert.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def concert_params
        params.require(:concert).permit(:name, :description)
      end
    end
  end
end
