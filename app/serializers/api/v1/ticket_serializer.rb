# frozen_string_literal: true

class TicketSerializer
  include FastJsonapi::ObjectSerializer
  attributes :sector, :row, :seat, :reserved, :mailed
  belongs_to :event
  belongs_to :user
end
