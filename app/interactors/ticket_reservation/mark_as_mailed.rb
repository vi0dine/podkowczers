# frozen_string_literal: true

module TicketReservation
  class MarkAsMailed
    include Interactor

    def call
      context.requested_tickets.each do |record|
        record[:ticket].mark_as_mailed
      end
    end
  end
end
