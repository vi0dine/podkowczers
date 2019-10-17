# frozen_string_literal: true

module TicketReservation
  class SendReservation
    include Interactor

    def call
      SendTicketsToUserJob
        .perform_later(context.user.id,
                       context.requested_tickets.first[:ticket].event.id,
                       context.save_path.to_s.gsub("\u0000", ''))
      rescue
        context.fail!('Nie można było przesłać biletów. Rezerwacja została anulowana.')
    end
  end
end
