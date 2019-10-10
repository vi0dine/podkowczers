# frozen_string_literal: true
module Api
  module V1
    class EventsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create]
      before_action :admin?, only: %i[create]

      def index
        @events = Event.all

        render json: EventSerializer.new(@events).serializable_hash
      end

      def show
        @event = Event.find(params[:id])

        render json: EventSerializer.new(@event).serializable_hash
      end

      def create
        @concert = Concert.find(params[:concert_id])
        @event = @concert.events.new(event_params)

        if @event.save
          render json: EventSerializer.new(@event).serializable_hash, status: :created
        else
          render json: { error: concert.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def event_params
        params.require(:event).permit(:place, :starts_at, :estimated_length)
      end
    end
  end
end