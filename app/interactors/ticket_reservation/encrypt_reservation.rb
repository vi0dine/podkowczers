# frozen_string_literal: true

module TicketReservation
  class EncryptReservation
    include Interactor

    def call
      signing_key = Ed25519::SigningKey.new(Rails.application.credentials[:tickets_secret])

      context.requested_tickets.each do |record|
        record.merge!(hash: signing_key.sign(record[:ticket].event_id.to_s))
      end
    end
  end
end
