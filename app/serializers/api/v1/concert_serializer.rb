# frozen_string_literal: true

module Api
  module V1
    class ConcertSerializer
      include FastJsonapi::ObjectSerializer
      attributes :name, :description
      attribute :tickets_count do |concert|
        concert.available_tickets_count
      end
      has_many :events
    end
  end
end
