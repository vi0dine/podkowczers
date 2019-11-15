# frozen_string_literal: true

module Api
  module V1
    class EventSerializer
      include FastJsonapi::ObjectSerializer
      attribute :concert do |event|
        event.concert.name
      end
      attributes :place, :starts_at, :estimated_length
      attribute :tickets_count do |event|
        event.available_tickets_count
      end
      has_many :reviews
      has_many :tickets
    end
  end
end