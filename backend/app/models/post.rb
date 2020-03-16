# frozen_string_literal: true

class Post < ApplicationRecord
  validates :permalink,
            presence: true,
            uniqueness: { case_sensitive: false }
  validates :created_time,
            presence: true
end
