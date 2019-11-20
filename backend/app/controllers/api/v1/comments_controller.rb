# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create destroy]
      before_action only: :destroy do
        owner_or_admin?(Comment)
      end
      before_action :set_post, only: %i[index create]

      def index
        @comments = @post.comments

        render json: CommentSerializer.new(@comments).serializable_hash, status: :ok
      end

      def create
        @comment = @post.comments.new(comment_params)
        @comment.user = current_user

        if @comment.save
          render json: CommentSerializer.new(@comment).serializable_hash, status: :created
        else
          render json: { error: @comment.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      def destroy
        @comment = Comment.find(params[:id])

        if @comment.delete
          render json: CommentSerializer.new(@comment).serializable_hash, status: :ok
        else
          render json: { error: @comment.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def comment_params
        params.require(:comment).permit(:body)
      end

      def set_post
        @post = Post.find(params[:post_id])
      end
    end
  end
end
