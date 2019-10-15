# frozen_string_literal: true

module Api
  module V1
    class CommentsController < ApplicationController
      before_action :authorize_access_request!, only: %i[create]

      def index
        @post = Post.find(params[:post_id])
        @comments = @post.comments

        render json: CommentSerializer.new(@comments).serializable_hash, status: :ok
      end

      def create
        @post = Post.find(params[:post_id])
        @comment = @post.comments.new(comment_params)
        @comment.user = current_user

        if @comment.save
          render json: CommentSerializer.new(@comment).serializable_hash, status: :created          
        else
          render json: { error: @comment.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def comment_params
        params.require(:comment).permit(:body)
      end
    end
  end
end
