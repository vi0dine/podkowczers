# frozen_string_literal: true

class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :body
  belongs_to :user
  has_many :tags
  has_many :comments
end
