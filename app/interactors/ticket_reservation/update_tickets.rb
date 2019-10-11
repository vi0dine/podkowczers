# frozen_string_literal: true

module TicketReservation
  class UpdateTickets
    include Interactor

    def call
      context.requested_tickets.each do |ticket|
        context.fail!(message: 'Bilet zarezerwowany') if ticket.reserved?

        ticket.with_lock do
          context.user.lock!
          ticket.reserved = true
          ticket.user = context.user
          ticket.save!
          context.user.decrement!(:coins_count)
          context.user.save!
        end
      end
    end
  end
end
