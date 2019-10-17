require 'rails_helper'

RSpec.describe TicketReservation::SendReservation do
  describe '.call' do
    context 'when given valid params' do
      let(:user) { create(:user, coins_count: 5)}
      let(:tickets) { create_list(:ticket, 5) }
      let(:req_tickets) { [
        { ticket: tickets[0],
          hash: 12,
          qr_code: RQRCode::QRCode.new('Some text for QR1').as_png(size: 220) },
        { ticket: tickets[1],
          hash: 3,
          qr_code: RQRCode::QRCode.new('Some text for QR2').as_png(size: 220) },
        { ticket: tickets[2],
          hash: 'dfgdwerewrwgeere34t2445fdfd',
          qr_code: RQRCode::QRCode.new('Some text for QR3').as_png(size: 220) }
      ] }
      let(:save_path) { Rails.root.join(
          "pdfs/#{req_tickets.first[:ticket].event.id}/#{user.id}",
          'tickets.pdf'
        ) }

      subject(:context) {
        TicketReservation::SendReservation.call(requested_tickets: req_tickets, user: user, save_path: save_path)
      }

      it 'succeeds' do
        expect(context).to be_a_success
      end
    end
  end
end
