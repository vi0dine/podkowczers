# frozen_string_literal: true

class Place < ApplicationRecord
  validates :name,
            presence: true,
            uniqueness: { case_sensitive: false }
  validates :plan,
            presence: true

  has_many :events
end