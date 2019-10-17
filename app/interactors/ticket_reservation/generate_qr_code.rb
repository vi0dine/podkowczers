# frozen_string_literal: true

module TicketReservation
  class GenerateQrCode
    include Interactor

    def call
      context.requested_tickets.each do |record|
        record.merge!(qr_code: RQRCode::QRCode.new(record[:hash]).as_png(size: 220))
      rescue
        context.fail!(message: 'Coś poszło nie tak. Spróbuj ponownie.')
      end
    end
  end
end
