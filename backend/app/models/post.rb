# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :posts_tags, dependent: :destroy
  has_many :tags, through: :posts_tags

  validates :title,
            presence: true,
            uniqueness: { case_sensitive: false },
            length: { minimum: 3 }
  validates :body,
            presence: true,
            length: { maximum: 11_500 }
end
