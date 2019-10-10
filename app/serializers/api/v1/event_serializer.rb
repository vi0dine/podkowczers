# frozen_string_literal: true

module Api
  module V1
    class EventSerializer
      include FastJsonapi::ObjectSerializer
      attributes :place, :starts_at, :estimated_length
      has_many :reviews
      has_many :tickets
      belongs_to :concert
    end
  end
end