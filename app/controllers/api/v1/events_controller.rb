# frozen_string_literal: true
module Api
  module V1
    class EventsController < ApplicationController
      def index
        @events = Event.all

        render json: EventSerializer.new(@events).serializable_hash
      end

      def show
        @event = Event.find(params[:id])

        render json: EventSerializer.new(@event).serializable_hash
      end
    end
  end
end