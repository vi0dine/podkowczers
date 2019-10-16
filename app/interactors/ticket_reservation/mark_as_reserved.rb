# frozen_string_literal: true

module TicketReservation
  class MarkAsReserved
    include Interactor

    def call
      context.requested_tickets.each do |record|
        ticket = record[:ticket]

        context.fail!(message: 'Bilet zarezerwowany') if ticket.reserved?

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
