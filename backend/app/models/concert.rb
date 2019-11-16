# frozen_string_literal: true

class Concert < ApplicationRecord
  include Rails.application.routes.url_helpers

  has_many_attached :photos
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

  def photos_paths
    paths = []
    self.photos.blobs.each do |photo|
      paths << polymorphic_url(photo)
    end
    paths
  end
end
