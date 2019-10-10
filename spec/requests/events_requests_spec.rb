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

  describe 'request to add new event' do
    let(:event) { attributes_for(:event) }
    let(:concert) { create(:concert) }

    context 'as an admin' do
      let(:admin) { create(:user, :admin) }

      before {
        @tokens = session(admin)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        post '/api/v1/events', params: { event: event, concert_id: concert.id },
                               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 201' do
        expect(response).to have_http_status(:created)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render new event data' do
        expect(json['data']).to_not be_empty
      end

      let(:another_event) { attributes_for(:event) }

      it 'add new event to db' do
        expect do
          post '/api/v1/events', params: { event: another_event, concert_id: concert.id },
                                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Event.all.count }.by(1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:user) { create(:user) }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        post '/api/v1/events', params: { event: event, concert_id: concert.id },
                               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_event) { attributes_for(:event) }

      it 'did not add new event to db' do
        expect do
          post '/api/v1/events', params: { event: another_event, concert_id: concert.id },
                                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Event.all.count }.by(0)
      end
    end

    context 'as a quest' do
      before {
        post '/api/v1/events', params: { event: event }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_event) { attributes_for(:event) }

      it 'did not add new event to db' do
        expect do
          post '/api/v1/events', params: { event: another_event, concert_id: concert.id }
        end .to change { Event.all.count }.by(0)
      end
    end
  end

  describe 'request to delete event' do
    context 'as an admin' do
      let(:events) { create_list(:event, 3) }
      let(:event_id) { events.sample.id }
      let(:admin) { create(:user, :admin) }

      before {
        @tokens = session(admin)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        delete "/api/v1/events/#{event_id}",
               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 204' do
        expect(response).to have_http_status(:no_content)
      end

      let(:another_event_id) { events.sample.id }

      it 'deletes event from db' do
        expect do
          delete "/api/v1/events/#{another_event_id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Event.all.count }.by(-1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:events) { create_list(:event, 3) }
      let(:event_id) { events.sample.id }
      let(:user) { create(:user) }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        delete "/api/v1/events/#{event_id}",
               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'did not deletes event from db' do
        expect do
          delete "/api/v1/events/#{event_id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Event.all.count }.by(0)
      end
    end

    context 'as a quest' do
      let(:events) { create_list(:event, 3) }
      let(:event_id) { events.sample.id }

      before {
        delete "/api/v1/events/#{event_id}"
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'did not deletes event from db' do
        expect do
          delete "/api/v1/events/#{event_id}"
        end .to change { Event.all.count }.by(0)
      end
    end
  end
end
