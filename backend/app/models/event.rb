# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :concert
  has_many :reviews
  has_many :tickets, dependent: :destroy

  validates :place,
            presence: true,
            length: { minimum: 5, maximum: 200 }
  validates :starts_at,
            presence: true
  validates :estimated_length,
            presence: true,
            numericality: { only_integers: true,
                            greater_than_or_equal_to: 30 }
  validates :concert_id,
            presence: true

  def available_tickets_count
    tickets.where(reserved: false).size
  end
end
