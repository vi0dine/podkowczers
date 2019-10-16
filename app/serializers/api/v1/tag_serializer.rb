# frozen_string_literal: true

module Api
  module V1
    class TagSerializer
      include FastJsonapi::ObjectSerializer
      attributes :title
      has_many :posts
    end
  end
end