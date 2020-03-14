# frozen_string_literal: true

module TicketReservation
  class EncryptReservation
    include Interactor

    def call
      signing_key = Ed25519::SigningKey.new(ENV['TICKETS_SECRET'])

      context.requested_tickets.each do |record|
        record.merge!(hash: signing_key.sign(record[:ticket].event_id.to_s).force_encoding('utf-8'))
      rescue
        context.fail!(message: 'Coś poszło nie tak. Spróbuj ponownie.')
      end
    end
  end
end
