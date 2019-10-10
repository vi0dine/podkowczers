# frozen_string_literal: true

module TicketReservation
  class GenerateBarcode
    include Interactor

    def call
      context.qr_codes = []
      context.tickets_hashes.each do |hash|
        qr_code = RQRCode::QRCode.new(hash)
        context.qr_codes << qr_code
      end
    end
  end
end
