# frozen_string_literal: true

module TicketReservation
  class EncryptReservation
    include Interactor

    def call
      cipher = Gibberish::AES.new(Rails.application.credentials[:AES_secret])

      context.tickets_hashes = []

      context.requested_tickets.each do |ticket|
        ticket_data = "TID: #{ticket.id} EID: #{ticket.event_id} UID: #{ticket.user_id}"
        context.tickets_hashes << cipher.encrypt(ticket_data)
      end
    end
  end
end
