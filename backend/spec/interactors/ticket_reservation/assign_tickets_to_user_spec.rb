require 'rails_helper'

RSpec.describe TicketReservation::AssignTicketsToUser do
  describe '.call' do
    context 'when given valid params' do
      let(:tickets) { create_list(:ticket, 5) }
      let(:user) { create(:user, coins_count: 5)}
      let(:req_tickets) { [{ ticket: tickets[0] }, { ticket: tickets[1] }, { ticket: tickets[2] }] }

      subject(:context) {
        TicketReservation::AssignTicketsToUser.call(requested_tickets: req_tickets, user: user)
      }

      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'assigns all tickets to the user' do
        tickets = context.requested_tickets.map(&:values).flatten
        ids = tickets.map(&:id)
        expect(Ticket.find(ids[1]).user).to eq(user)
        expect(Ticket.find(ids[2]).user).to eq(user)
        expect(Ticket.find(ids[0]).user).to eq(user)
      end

      let(:more_req_tickets) { [{ ticket: tickets[3] }, { ticket: tickets[4] }] }

      it 'takes coins from user' do
        tickets_count = more_req_tickets.size
        expect{ TicketReservation::AssignTicketsToUser.call(requested_tickets: more_req_tickets, user: user) }
          .to change{ User.find(user.id).coins_count }
          .by(-tickets_count)
      end
    end

    context 'when given already assigned tickets' do
      let(:previous_user) { create(:user)}
      let(:tickets) { create_list(:ticket, 5, user: previous_user) }
      let(:user) { create(:user, coins_count: 5)}
      let(:req_tickets) { [{ ticket: tickets[0] }, { ticket: tickets[1] }, { ticket: tickets[2] }] }

      subject(:context) {
        TicketReservation::AssignTicketsToUser.call(requested_tickets: req_tickets, user: user)
      }

      it 'fails' do
        expect(context).to be_a_failure
      end

      it 'provides a failure message' do
        expect(context.message).to eq('Bilet ma już przypisanego użytkownika')
      end

      it 'does not assign tickets to the new user' do
        tickets = context.requested_tickets.map(&:values).flatten
        ids = tickets.map(&:id)
        expect(Ticket.find(ids[1]).user).to_not eq(user)
        expect(Ticket.find(ids[2]).user).to_not eq(user)
        expect(Ticket.find(ids[0]).user).to_not eq(user)
      end

      let(:more_req_tickets) { [{ ticket: tickets[3] }, { ticket: tickets[4] }] }

      it 'does not take coins from new user' do
        expect{ TicketReservation::AssignTicketsToUser.call(requested_tickets: more_req_tickets, user: user) }
          .to_not change{ User.find(user.id).coins_count }
      end
    end

    context 'when user has not enough coins' do
      let(:tickets) { create_list(:ticket, 5) }
      let(:user) { create(:user, coins_count: 0) }
      let(:req_tickets) { [{ ticket: tickets[0] }, { ticket: tickets[1] }, { ticket: tickets[2] }, { ticket: tickets[3] }, { ticket: tickets[4] }] }

      subject(:context) {
        TicketReservation::AssignTicketsToUser.call(requested_tickets: req_tickets, user: user)
      }

      it 'fails' do
        expect(context).to be_a_failure
      end

      it 'provides a failure message' do
        expect(context.message).to eq('Użytkownik nie ma tylu monet')
      end

      it 'does not assign tickets to the user' do
        tickets = context.requested_tickets.map(&:values).flatten
        ids = tickets.map(&:id)
        expect(Ticket.find(ids[0]).user).to_not eq(user)
        expect(Ticket.find(ids[1]).user).to_not eq(user)
        expect(Ticket.find(ids[2]).user).to_not eq(user)
        expect(Ticket.find(ids[3]).user).to_not eq(user)
        expect(Ticket.find(ids[4]).user).to_not eq(user)
      end

      let(:more_req_tickets) { [{ ticket: tickets[0] }, { ticket: tickets[1] }, { ticket: tickets[2] }, { ticket: tickets[3] }, { ticket: tickets[4] }] }

      it 'does not take coins from new user' do
        expect{ TicketReservation::AssignTicketsToUser.call(requested_tickets: more_req_tickets, user: user) }
          .to_not change{ User.find(user.id).coins_count }
      end
    end
  end
end
