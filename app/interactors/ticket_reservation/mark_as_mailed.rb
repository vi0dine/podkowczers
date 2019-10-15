# frozen_string_literal: true

module TicketReservation
  class MarkAsMailed
    include Interactor

    def call
      context.requested_tickets.each do |record|
        record[:ticket].update(mailed: true)
      end
    end
  end
end
