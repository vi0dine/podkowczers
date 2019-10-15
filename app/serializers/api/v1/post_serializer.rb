# frozen_string_literal: true

module Api
  module V1
    class PostSerializer
      include FastJsonapi::ObjectSerializer
      attributes :title, :body
      belongs_to :user
      has_many :tags
      has_many :comments
    end
  end
end
