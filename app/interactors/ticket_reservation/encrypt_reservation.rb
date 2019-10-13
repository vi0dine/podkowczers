# frozen_string_literal: true

module TicketReservation
  class EncryptReservation
    include Interactor

    def call
      signing_key = Ed25519::SigningKey.new(Rails.application.credentials[:tickets_secret])

      context.tickets_hashes = []

      context.requested_tickets.each do |ticket|
        context.tickets_hashes << signing_key.sign(ticket.event_id.to_s)
      end
    end
  end
end
