require 'rails_helper'

RSpec.describe TicketReservation::MakePdfAttachment do
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

      subject(:context) {
        TicketReservation::MakePdfAttachment.call(requested_tickets: req_tickets, user: user)
      }

      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'provides save path' do
        expect(context.save_path).to_not be_empty
      end
    end

    context 'when given invalid params' do
      let(:user) { create(:user, coins_count: 5)}
      let(:tickets) { create_list(:ticket, 5) }
      let(:req_tickets) { [
        { ticket: tickets[0],
          hash: 12 },
        { ticket: tickets[1],
          hash: 3,
          qr_code: RQRCode::QRCode.new('Some text for QR2').as_png(size: 220) },
        { ticket: tickets[2],
          hash: 'dfgdwerewrwgeere34t2445fdfd',
          qr_code: RQRCode::QRCode.new('Some text for QR3').as_png(size: 220) }
      ] }

      subject(:context) {
        TicketReservation::MakePdfAttachment.call(requested_tickets: req_tickets, user: user)
      }

      it 'fails' do
        expect(context).to be_a_failure
      end

      it 'provides error message' do
        expect(context.message).to eq('Nie można było utworzyć pliku PDF z biletami. Rezerwacja została anulowana.
                       Prosimy spróbować później lub powiadomić administratora o występującym problemie')
      end
    end
  end
end
