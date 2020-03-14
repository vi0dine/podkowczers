require 'rails_helper'

RSpec.describe TicketReservation::EncryptReservation do
  let(:signing_key) { Ed25519::SigningKey.new(ENV['TICKETS_SECRET']) }

  describe '.call' do
    context 'when given valid params' do
      let(:tickets) { create_list(:ticket, 3) }
      let(:req_tickets) { [{ ticket: tickets[0] }, { ticket: tickets[1] }, { ticket: tickets[2] }] }

      subject(:context) {
        TicketReservation::EncryptReservation.call(requested_tickets: req_tickets)
      }

      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'adds hash key with hashed reservation to requested_tickets hash' do
        expect(context.requested_tickets)
          .to include(ticket: req_tickets[0][:ticket], hash: signing_key.sign(req_tickets[0][:ticket].event_id.to_s).force_encoding('utf-8'))
          .and include(ticket: req_tickets[1][:ticket], hash: signing_key.sign(req_tickets[1][:ticket].event_id.to_s).force_encoding('utf-8'))
          .and include(ticket: req_tickets[2][:ticket], hash: signing_key.sign(req_tickets[2][:ticket].event_id.to_s).force_encoding('utf-8'))
      end
    end

    context 'when given invalid params' do
      let(:tickets) { create_list(:ticket, 3) }
      let(:req_tickets) { [{ ticket: nil }, { ticket: tickets[1] }, { ticket: tickets[2] }] }

      subject(:context) {
        TicketReservation::EncryptReservation.call(requested_tickets: req_tickets)
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
