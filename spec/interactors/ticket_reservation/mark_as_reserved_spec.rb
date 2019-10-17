require 'rails_helper'

RSpec.describe TicketReservation::MarkAsReserved do
  describe '.call' do
    context 'when given valid params' do
      let(:tickets) { create_list(:ticket, 3) }
      let(:req_tickets) { [{ ticket: tickets[0] }, { ticket: tickets[1] }, { ticket: tickets[2] }] }
      subject(:context) {
        TicketReservation::MarkAsReserved.call(requested_tickets: req_tickets)
      }

      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'marks all tickets as reserved' do
        tickets = context.requested_tickets.map(&:values).flatten
        ids = tickets.map(&:id)
        expect(Ticket.find(ids[0]).reserved).to be_truthy
        expect(Ticket.find(ids[1]).reserved).to be_truthy
        expect(Ticket.find(ids[2]).reserved).to be_truthy
      end
    end

    context 'when given ids of reserved tickets' do
      let(:tickets) { create_list(:ticket, 3, reserved: true) }
      let(:req_tickets) { [{ ticket: tickets[0] }, { ticket: tickets[1] }, { ticket: tickets[2] }] }
      subject(:context) {
        TicketReservation::MarkAsReserved.call(requested_tickets: req_tickets)
      }

      it 'fails' do
        expect(context).to be_a_failure
      end
    end
  end
end
