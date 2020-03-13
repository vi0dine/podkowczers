# frozen_string_literal: true

module Api
  module V1
    class EventsController < ApplicationController
      before_action :doorkeeper_authorize!
      load_and_authorize_resource except: [:create]

      api!
      def index; end

      api!
      def show; end

      api!
      def create
        @concert = Concert.find(params[:concert_id])
        @event = @concert.events.new(event_params)

        authorize! :create, Event
        if @event.save
          render 'create', status: :created
        else
          render json: { error: @event.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      api!
      def update
        if @event.update(event_params)
          render 'create', status: :ok
        else
          render json: { error: @event.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      api!
      def destroy
        if @event.destroy
          render 'destroy'
        else
          render json: { error: @event.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def event_params
        params.require(:event).permit(:place, :starts_at, :estimated_length)
      end
    end
  end
end
