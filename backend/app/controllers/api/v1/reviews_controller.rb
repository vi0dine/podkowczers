# frozen_string_literal: true

module Api
  module V1
    class ReviewsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create update destroy]
      before_action :admin?, only: :destroy
      before_action only: :update do
        owner_or_admin?(Review)
      end
      before_action :set_review, only: %i[update destroy]

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

      def update
        if @review.update(review_params)
          render json: ReviewSerializer.new(@review).serializable_hash, status: :ok
        else
          render json: { error: @review.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def destroy
        if @review.delete
          render json: ReviewSerializer.new(@review).serializable_hash, status: :ok
        else
          render json: { error: @review.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def review_params
        params.require(:review).permit(:title, :body, :rate)
      end

      def set_review
        @review = Review.find(params[:id])
      end
    end
  end
end
