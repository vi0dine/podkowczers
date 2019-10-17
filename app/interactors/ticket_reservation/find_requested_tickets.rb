# frozen_string_literal: true

module TicketReservation
  class FindRequestedTickets
    include Interactor

    def call
      context.fail!(message: 'Nie podano miejsce') if context.tickets_ids.empty?

      context.requested_tickets = []
      context.tickets_ids.each do |ticket_id|
        context.requested_tickets << { ticket: Ticket.find(ticket_id) }
      rescue ActiveRecord::RecordNotFound
        context.fail!(message: 'Nie znaleziono biletu o danym ID')
      end
    end
  end
end
