# frozen_string_literal: true

module Api
  module V1
    class TicketSerializer
      include FastJsonapi::ObjectSerializer
      attributes :sector, :row, :seat, :reserved, :mailed
      belongs_to :event
      belongs_to :user
    end
  end
end
