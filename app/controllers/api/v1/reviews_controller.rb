# frozen_string_literal: true

module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create destroy]
      before_action :admin?, only: :destroy

      def index
        @reviews = Review.all

        render json: ReviewSerializer.new(@reviews).serializable_hash
      end

      def create
        @event = Event.find(params[:event_id])
        @review = @event.reviews.new(review_params)
        @review.user = current_user

        if @review.save
          render json: ReviewSerializer.new(@review).serializable_hash, status: :created
        else
          render json: { error: @review.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def destroy
        review = Review.find(params[:id])

        if review.delete
          render json: { message: 'Successfully removed' }, status: :no_content
        else
          render json: { error: review.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def review_params
        params.require(:review).permit(:title, :body, :rate)
      end
    end
  end
end