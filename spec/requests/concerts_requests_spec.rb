require 'rails_helper'

RSpec.describe 'Concerts', type: :request do
  describe 'request list of all concerts' do
    let!(:concerts) { create_list(:concert, 2) }

    before {
      get '/api/v1/concerts'
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render all concerts data' do
      expect(json['data'].size).to eq(2)
    end
  end

  describe 'request single concert data' do
    let!(:concerts) { create_list(:concert, 2) }
    let(:concert_id) { concerts.first.id }

    before {
      Concert.find(concert_id).tickets.first.update(reserved: true)
      get "/api/v1/concert/#{concert_id}" 
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render concert data by given id' do
      expect(json['data']['id']).to eq(concert_id)
    end

    it 'render available tickets count' do
      expect(json['data']['attributes']['tickets_count']).to eq(59)
    end
  end
end
