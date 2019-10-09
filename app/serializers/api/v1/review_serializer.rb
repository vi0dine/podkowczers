# frozen_string_literal: true

class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :body, :rate
  belongs_to :user
end
