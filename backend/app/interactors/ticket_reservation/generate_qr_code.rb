# frozen_string_literal: true

module TicketReservation
  class GenerateQrCode
    include Interactor

    def call
      context.requested_tickets.each do |record|
        if !record[:ticket] || !record[:hash]
          raise StandardError
        end

        qr_code = RQRCode::QRCode.new(
            "S#{record[:ticket][:sector]}/R#{record[:ticket][:row]}/St#{record[:ticket][:seat]}/H#{record[:hash]}"
        ).as_png(size: 300)

        record.merge!(qr_code: qr_code)
        record[:ticket].update(qr_code: Base64.encode64(qr_code.to_s))
      rescue
        context.fail!(message: 'Coś poszło nie tak. Spróbuj ponownie.')
      end
    end
  end
end

#<Ticket id: 57, sector: "A", row: 3, seat: 17, reserved: true, mailed: false, user_id: 40, event_id: 1, created_at: "2019-11-16 18:25:45", updated_at: "2019-11-27 18:41:29">/n(�Go�]�^I����r��S�WS���&�q7�o	�CA�}�����']�b@\�E+��{�:y