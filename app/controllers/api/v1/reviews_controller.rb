# frozen_string_literal: true

module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :authorize_access_request!, only: [:create]

      def index
        @reviews = Review.all

        render json: ReviewSerializer.new(@reviews).serializable_hash
      end

      def create
        review = Review.new(review_params)
        review.user = current_user

        if review.save
          render json: ReviewSerializer.new(review).serializable_hash, status: :created
        else
          puts review.errors.full_messages
          render json: { error: review.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def review_params
        params.require(:review).permit(:title, :body, :rate, :event_id)
      end
    end
  end
end