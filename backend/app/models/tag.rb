# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :posts_tags
  has_many :posts, through: :posts_tags

  validates :name,
            presence: true,
            length: { minimum: 2, maximum: 20 }
end
