# frozen_string_literal: true

class Review < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :title,
            presence: true,
            length: { minimum: 3, maximum: 50 },
            uniqueness: { case_sensitive: false }
  validates :body,
            presence: true,
            length: { minimum: 10, maximum: 2000 }
  validates :rate,
            presence: true,
            numericality: { only_integers: true,
                            less_than_or_equal_to: 5,
                            greater_than_or_equal_to: 0 }
end
