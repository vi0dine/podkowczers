# frozen_string_literal: true

module TicketReservation
  class AssignTicketsToUser
    include Interactor

    def call
      if context.user.coins_count < context.requested_tickets.size
        context.fail!(message: 'Użytkownik nie ma tylu monet')
      end

      if context.requested_tickets.any? { |record| record[:ticket].user != nil }
        context.fail!(message: 'Bilet ma już przypisanego użytkownika')
      end

      context.requested_tickets.each do |record|
        ticket = record[:ticket]
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
