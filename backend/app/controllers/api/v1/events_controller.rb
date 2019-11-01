# frozen_string_literal: true

module Api
  module V1
    class EventsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create update destroy]
      before_action :admin?, only: %i[create update destroy]
      before_action :set_event, only: %i[show update destroy]

      def index
        @events = Event.all

        render json: EventSerializer.new(@events).serializable_hash
      end

      def show
        render json: EventSerializer.new(@event).serializable_hash
      end

      def create
        @concert = Concert.find(params[:concert_id])
        @event = @concert.events.new(event_params)

        if @event.save
          render json: EventSerializer.new(@event).serializable_hash, status: :created
        else
          render json: { error: @event.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def update
        if @event.update(event_params)
          render json: EventSerializer.new(@event).serializable_hash, status: :ok
        else
          render json: { error: @event.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def destroy
        if @event.delete
          render json: { message: 'Successfully deleted event' }, status: :no_content
        else
          render json: { error: @event.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def event_params
        params.require(:event).permit(:place, :starts_at, :estimated_length)
      end

      def set_event
        @event = Event.find(params[:id])
      end
    end
  end
end
