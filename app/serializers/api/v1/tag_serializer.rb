# frozen_string_literal: true

class TagSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title
  has_many :posts
end
