# frozen_string_literal: true

module TicketReservation
  class MarkAsReserved
    include Interactor

    def call
      if context.requested_tickets.any? { |record| record[:ticket].reserved? }
        context.fail!(message: 'Bilet zarezerwowany') 
      end

      context.requested_tickets.each do |record|
        ticket = record[:ticket]
        ticket.mark_as_reserved
      end
    end

    def rollback
      context.requested_tickets.each do |record|
        ticket = record[:ticket]
        ticket.mark_as_free
      end
    end
  end
end
