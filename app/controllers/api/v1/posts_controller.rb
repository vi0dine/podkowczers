# frozne_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create update destroy]
      before_action :admin?, only: %i[create update destroy]

      def index
        @posts = Post.all

        render json: PostSerializer.new(@posts).serializable_hash, status: :ok
      end

      def show
        @post = Post.find(params[:id])

        render json: PostSerializer.new(@post).serializable_hash, status: :ok
      end

      def create
        @user = current_user
        @post = @user.posts.new(post_params)

        if @post.save
          render json: PostSerializer.new(@post).serializable_hash, status: :created
        else
          render json: { error: @post.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def update
        @post = Post.find(params[:id])

        if @post.update(post_params)
          render json: PostSerializer.new(@post).serializable_hash, status: :ok
        else
          render json: { error: @post.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def destroy
        @post = Post.find(params[:id])

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
    end
  end
end
