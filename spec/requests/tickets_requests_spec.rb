require 'rails_helper'

RSpec.describe 'Tickets', type: :request do
  describe 'request list of all tickets' do
    let!(:tickets) { create_list(:ticket, 50) }

    before {
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

  # describe 'can be reserved by user' do
  #   let!(:tickets) { create_list(:ticket, 50) }
  #   let(:ticket_id) { tickets.first.id }

  #   before {
  #     patch "/api/v1/tickets/#{ticket_id}"
  #   }

  #   it 'respond with code 200' do
  #     expect(response).to have_http_status(:ok)
  #   end

  #   it 'respond with JSON' do
  #     expect(response.content_type).to eq('application/json; charset=utf-8')
  #   end

  #   it 'render ticket data' do
  #     expect(json['data']['attributes']).to eq(Ticket.find(ticket_id).attributes)
  #   end

  #   it 'render message about reservation' do
  #     expect(json['message']).to eq('Reserved')
  #   end
  # end
end
