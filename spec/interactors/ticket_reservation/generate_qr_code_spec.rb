require 'rails_helper'

RSpec.describe TicketReservation::GenerateQrCode do
  describe '.call' do
    context 'when given valid params' do
      let(:tickets) { create_list(:ticket, 3) }
      let(:req_tickets) { [
        { ticket: tickets[0],
          hash: 'dfgdgeerwerwee34t2445ttfdfd' },
        { ticket: tickets[1],
          hash: 'dfgdgeere34t2utyut445fdfeed' },
        { ticket: tickets[2],
          hash: 'dfgdwerewrwgeere34t2445fdfd' }
      ] }

      subject(:context) {
        TicketReservation::GenerateQrCode.call(requested_tickets: req_tickets)
      }

      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'adds qr code from hashed reservation to requested_tickets hash' do
        expect(context.requested_tickets)
          .to include(ticket: req_tickets[0][:ticket],
                      hash: req_tickets[0][:hash],
                      qr_code: RQRCode::QRCode.new(req_tickets[0][:hash]).as_png(size: 220))
          .and include(ticket: req_tickets[1][:ticket],
                       hash: req_tickets[1][:hash],
                       qr_code: RQRCode::QRCode.new(req_tickets[1][:hash]).as_png(size: 220))
          .and include(ticket: req_tickets[2][:ticket],
                       hash: req_tickets[2][:hash],
                       qr_code: RQRCode::QRCode.new(req_tickets[2][:hash]).as_png(size: 220))
      end
    end

    context 'when given invalid params' do
      let(:tickets) { create_list(:ticket, 3) }
      let(:req_tickets) { [
        { ticket: tickets[0],
          hash: 12 },
        { ticket: tickets[1],
          hash: 3 },
        { ticket: tickets[2],
          hash: 'dfgdwerewrwgeere34t2445fdfd' }
      ] }

      subject(:context) {
        TicketReservation::GenerateQrCode.call(requested_tickets: req_tickets)
      }

      it 'fails' do
        expect(context).to be_a_failure
      end

      it 'provides error message' do
        expect(context.message).to eq('Coś poszło nie tak. Spróbuj ponownie.')
      end
    end
  end
end
