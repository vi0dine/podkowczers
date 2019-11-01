# frozen_string_literal: true

class Concert < ApplicationRecord
  has_many :events
  has_many :tickets, through: :events

  validates :name,
            presence: true,
            uniqueness: { case_sensitive: false },
            length: { minimum: 3, maximum: 50 }
  validates :description,
            presence: true,
            length: { minimum: 20, maximum: 5000 }

  def available_tickets_count
    tickets.where(reserved: false).size
  end
end
