require 'rails_helper'

RSpec.describe 'Tickets', type: :request do
  describe 'request list of all tickets' do
    let!(:tickets) { create_list(:ticket, 50) }

    context 'as an admin' do
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        get '/api/v1/tickets', headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render all tickets data' do
        expect(json[:tickets].size).to eq(50)
      end
    end

    context 'as a regular user' do
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        get '/api/v1/tickets', headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'list only available tickets' do
        expect(json[:tickets]).to all(include(reserved: false))
      end
    end
  end

  describe 'can be reserved by user' do
    let!(:tickets) { create_list(:ticket, 50) }
    let(:first_ticket_id) { tickets.first.id }
    let(:second_ticket_id) { tickets[1].id }
    let(:tickets_array) { [first_ticket_id, second_ticket_id] }
    let(:user) { create(:user, coins_count: 20) }
    let(:token) { get_access_token(user) }

    before {
      post '/api/v1/tickets', params: {tickets: tickets_array}, headers: {
          "Authorization": "Bearer #{token}"
      }
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render correct ticket array data (size)' do
      expect(json[:tickets].size).to eq(2)
    end

    it 'render correct tickets data' do
      expect(json[:tickets].first).to include(
                                          id: tickets.first.id,
                                          event: tickets.first.event_id,
                                          sector: tickets.first.sector,
                                          row: tickets.first.row,
                                          seat: tickets.first.seat,
                                          qr: be_present
                                      )
      expect(json[:tickets][1]).to include(
                                         id: tickets[1].id,
                                         event: tickets[1].event_id,
                                         sector: tickets[1].sector,
                                         row: tickets[1].row,
                                         seat: tickets[1].seat,
                                         qr: be_present
                                       )
    end

    it 'assigns ticket to the current user' do
      expect(Ticket.find(first_ticket_id).user).to eq(user)
      expect(Ticket.find(second_ticket_id).user).to eq(user)
    end

    let(:another_tickets_array) { [tickets.last.id, tickets[4].id] }

    it 'remove coins from user' do
      expect do
        post '/api/v1/tickets', params: {tickets: another_tickets_array}, headers: {
            "Authorization": "Bearer #{token}"
        }
      end.to change { User.find(user.id).coins_count }.by(-another_tickets_array.size)
    end
  end

  describe 'can be returned by user' do
    let(:user) { create(:user, :with_tickets) }
    let(:ticket_id) { user.tickets.sample.id }
    let(:token) { get_access_token(user) }

    before {
      post "/api/v1/tickets/#{ticket_id}/return", headers: {
          "Authorization": "Bearer #{token}"
      }
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render one ticket' do
      expect(json[:ticket]).to_not be_empty
    end

    it 'render correct ticket data' do
      expect(json[:ticket]).to include(
                                          id: ticket_id,
                                          event: Ticket.find(ticket_id).event_id
                                      )
    end

    it 'unassign ticket from the current user' do
      expect(Ticket.find(ticket_id).user).to be_nil
    end
  end
end
