# frozen_string_literal: true

module TicketReservation
  class FindRequestedTickets
    include Interactor

    def call
      context.requested_tickets = []
      context.tickets_ids.each do |ticket_id|
        unless Ticket.find(ticket_id)
          context.fail!(message: 'Nie znaleziono biletu o danym ID')
        end

        context.requested_tickets << Ticket.find(ticket_id)
      end
    end
  end
end
