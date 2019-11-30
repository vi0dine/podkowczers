# frozen_string_literal: true

module TicketReservation
  class GenerateQrCode
    include Interactor

    def call
      context.requested_tickets.each do |record|
        record.merge!(qr_code: RQRCode::QRCode.new("#{record[:ticket].inspect}/n#{record[:hash]}").as_png(size: 220))
      rescue
        context.fail!(message: 'Coś poszło nie tak. Spróbuj ponownie.')
      end
    end
  end
end

#<Ticket id: 57, sector: "A", row: 3, seat: 17, reserved: true, mailed: false, user_id: 40, event_id: 1, created_at: "2019-11-16 18:25:45", updated_at: "2019-11-27 18:41:29">/n(�Go�]�^I����r��S�WS���&�q7�o	�CA�}�����']�b@\�E+��{�:y