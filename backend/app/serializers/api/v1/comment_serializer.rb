# frozen_string_literal: true

module Api
  module V1
    class CommentSerializer
      include FastJsonapi::ObjectSerializer
      attributes :body
      belongs_to :user
    end
  end
end
