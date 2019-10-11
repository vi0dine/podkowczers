require 'rails_helper'

RSpec.describe 'Tickets', type: :request do
  describe 'request list of all tickets' do
    let!(:tickets) { create_list(:ticket, 50) }

    context 'as an admin' do
      let(:admin) { create(:user, :admin) }

      before {
        @tokens = session(admin)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        get '/api/v1/tickets'
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render all tickets data' do
        expect(json['data'].size).to eq(50)
      end
    end

    context 'as a regular user' do
      let(:user) { create(:user) }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        get '/api/v1/tickets'
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'can be reserved by user' do
    let!(:tickets) { create_list(:ticket, 50) }
    let(:first_ticket_id) { tickets.first.id }
    let(:second_ticket_id) { tickets[1].id }
    let(:tickets_array) { [first_ticket_id, second_ticket_id] }
    let(:user) { create(:user, coins_count: 20) }

    before {
      @tokens = session(user)
      cookies[JWTSessions.access_cookie] = @tokens[:access]
      post '/api/v1/tickets', params: { tickets: tickets_array },
                              headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render correct ticket array data (size)' do
      expect(json['data'].size).to eq(2)
    end

    it 'render correct tickets data' do
      expect((json['data'].first)['attributes']).to include(
        "sector" => tickets.first.sector,
        "row" => tickets.first.row,
        "seat" => tickets.first.seat,
        "reserved" => true
      )
      expect((json['data'][1])['attributes']).to include(
        "sector" => tickets[1].sector,
        "row" => tickets[1].row,
        "seat" => tickets[1].seat,
        "reserved" => true
      )
    end

    it 'assigns ticket to the current user' do
      expect(Ticket.find(first_ticket_id).user).to eq(user)
      expect(Ticket.find(second_ticket_id).user).to eq(user)
    end

    let(:another_tickets_array) { [tickets.last.id, tickets[4].id] }

    it 'remove coins from user' do
      expect do
        post '/api/v1/tickets', params: { tickets: another_tickets_array },
                                headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      end.to change { User.find(user.id).coins_count }.by(-another_tickets_array.size)
    end
  end
end
