# frozen_string_literal: true

class ConcertSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
  attribute :tickets_count do |concert|
    concert.tickets.count
  end
  has_many :events
end
