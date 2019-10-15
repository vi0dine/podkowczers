# frozne_string_literal: true

module Api
  module V1
    class PostsController < ApplicationController
      def index
        @posts = Post.all

        render json: PostSerializer.new(@posts).serializable_hash, status: :ok
      end
    end
  end
end
