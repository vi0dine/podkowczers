require 'rails_helper'

RSpec.describe TicketReservation::FindRequestedTickets do
  let(:tickets) { create_list(:ticket, 3) }
  describe '.call' do
    context 'when given valid params' do
      let(:user) { create(:user, coins_count: 5)}
      let(:ids_array) { [tickets[0].id, tickets[1].id, tickets[2].id] }

      subject(:context) {
        TicketReservation::FindRequestedTickets.call(tickets_ids: ids_array, user: user) 
      }

      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'provides the user' do
        expect(context.user).to eq(user)
      end

      it 'creates array of HASHES with requested tickets' do
        expect(context.requested_tickets)
          .to include({ ticket: Ticket.find(ids_array[0]) })
          .and include({ ticket: Ticket.find(ids_array[1]) })
          .and include({ ticket: Ticket.find(ids_array[2]) })
      end
    end

    context 'when given empty ids array' do
      let(:user) { create(:user, coins_count: 5)}
      let(:ids_array) { [] }

      subject(:context) {
        TicketReservation::FindRequestedTickets.call(tickets_ids: ids_array, user: user) 
      }

      it 'fails' do
        expect(context).to be_a_failure
      end

      it 'provides a failure message' do
        expect(context.message).to eq('Nie podano miejsc')
      end

      it 'does not create requested tickets array' do
        expect(context.requested_tickets)
          .to be_nil
      end
    end

    context 'when given ids array with wrong ids' do
      let(:user) { create(:user, coins_count: 5)}
      let(:ids_array) { [1231231, 235346457567] }

      subject(:context) {
        TicketReservation::FindRequestedTickets.call(tickets_ids: ids_array, user: user) 
      }

      it 'fails' do
        expect(context).to be_a_failure
      end

      it 'provides a failure message' do
        expect(context.message).to eq('Nie znaleziono biletu o danym ID')
      end

      it 'does not create requested tickets array' do
        expect(context.requested_tickets)
          .to eq([])
      end
    end
  end
end
