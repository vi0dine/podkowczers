# frozen_string_literal: true

class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :body
  belongs_to :user
end
