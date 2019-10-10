# frozen_string_literal: true

module Api
  module V1
    class ReviewSerializer
      include FastJsonapi::ObjectSerializer
      attributes :title, :body, :rate
      belongs_to :user
    end
  end
end
