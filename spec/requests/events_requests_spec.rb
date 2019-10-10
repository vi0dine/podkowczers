require 'rails_helper'

RSpec.describe 'Events', type: :request do
  describe 'request list of all events' do
    let!(:events) { create_list(:event, 2) }

    before {
      get '/api/v1/events'
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render all events data' do
      expect(json['data'].size).to eq(2)
    end
  end

  describe 'request single event data' do
    let!(:events) { create_list(:event, 2, :with_tickets) }
    let(:event_id) { events.last.id }

    before {
      Event.find(event_id).tickets.first.update(reserved: true)
      get "/api/v1/events/#{event_id}"
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render event data by given id' do
      expect(json['data']['id'].to_i).to eq(event_id)
    end

    it 'render all tickets' do
      expect(json['data']['relationships']['tickets']['data'].size).to eq(20)
    end

    it 'render place info' do
      expect(json['data']['attributes']['place']).to_not be_empty
    end

    it 'render datetime info' do
      expect(json['data']['attributes']['starts_at']).to_not be_empty
    end
  end
end
