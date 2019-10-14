# frozen_string_literal: true

module TicketReservation
  class GenerateQrCode
    include Interactor

    def call
      context.requested_tickets.each do |record|
        record.merge!(qr_code: RQRCode::QRCode.new(record[:hash]).as_png)
      end
    end
  end
end
