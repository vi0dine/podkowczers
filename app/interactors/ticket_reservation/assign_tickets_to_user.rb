# frozen_string_literal: true

module TicketReservation
  class AssignTicketsToUser
    include Interactor

    def call
      context.requested_tickets.each do |record|
        ticket = record[:ticket]

        context.fail!(message: 'Bilet ma już przypisanego użytkownika') unless ticket.user.nil?
        context.fail!(message: 'Użytkownik nie ma tylu monet') if context.user.coins_count < context.requested_tickets.size

        context.user.with_lock do
          context.user.assign_ticket(ticket)
          context.user.decrement_coins_count
        end
      end
    end

    def rollback
      context.requested_tickets.each do |record|
        ticket = record[:ticket]

        context.user.with_lock do
          context.user.dissociate_ticket(ticket)
          context.user.add_coins(1)
        end
      end
    end
  end
end
