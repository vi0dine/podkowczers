# frozen_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create update destroy]
      before_action :admin?, only: %i[create update destroy]
      before_action :set_post, only: %i[show update destroy]

      def index
        @posts = Post.all

        render json: PostSerializer.new(@posts).serializable_hash, status: :ok
      end

      def show
        render json: PostSerializer.new(@post).serializable_hash, status: :ok
      end

      def create
        @post = current_user.posts.new(post_params)

        if @post.save
          render json: PostSerializer.new(@post).serializable_hash, status: :created
        else
          render json: { error: @post.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def update
        if @post.update(post_params)
          render json: PostSerializer.new(@post).serializable_hash, status: :ok
        else
          render json: { error: @post.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def destroy
        if @post.destroy
          render json: { message: 'Successfully deleted event' }, status: :no_content
        else
          render json: { error: @post.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def post_params
        params.require(:post).permit(:title, :body)
      end

      def set_post
        @post = Post.find(params[:id])
      end
    end
  end
end
