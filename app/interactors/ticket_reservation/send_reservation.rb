# frozen_string_literal: true

module TicketReservation
  class SendReservation
    include Interactor

    def call
      SendTicketsToUserJob
        .perform_later(context.user.id, context.requested_tickets.collect { |hash| hash[:ticket].id })
    rescue
      context.fail!(message: 'Nie można było przesłać biletów. Rezerwacja została anulowana.')
    end
  end
end
