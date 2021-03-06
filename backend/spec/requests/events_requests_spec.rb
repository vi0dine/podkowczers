require 'rails_helper'

RSpec.describe 'Events', type: :request do
  describe 'request list of all events' do
    let(:user) { create(:user) }
    let(:token) { get_access_token(user) }
    let!(:events) { create_list(:event, 2) }

    before {
      get '/api/v1/events', headers: {
          "Authorization": "Bearer #{token}"
      }
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render all events data' do
      expect(json[:events].size).to eq(2)
    end
  end

  describe 'request single event data' do
    let(:user) { create(:user) }
    let(:token) { get_access_token(user) }
    let!(:events) { create_list(:event, 2, :with_tickets) }
    let(:event_id) { events.last.id }

    before {
      Event.find(event_id).tickets.first.update(reserved: true)
      get "/api/v1/events/#{event_id}", headers: {
          "Authorization": "Bearer #{token}"
      }
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render event data by given id' do
      expect(json[:event][:id].to_i).to eq(event_id)
    end

    it 'render all tickets' do
      expect(json[:event][:tickets].size).to eq(20)
    end

    it 'render place info' do
      expect(json[:event][:place]).to_not be_empty
    end

    it 'render datetime info' do
      expect(json[:event][:starts_at]).to_not be_empty
    end
  end

  describe 'request to add new event' do
    let(:event) { attributes_for(:event) }
    let(:place) { create(:place) }
    let(:concert) { create(:concert) }

    context 'as an admin' do
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        post '/api/v1/events', params: { event: event.merge(concert_id: concert.id, place: place.id) }, headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 201' do
        expect(response).to have_http_status(:created)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render new event data' do
        expect(json[:event]).to_not be_empty
      end

      let(:another_event) { attributes_for(:event) }

      it 'add new event to db' do
        expect do
          post '/api/v1/events', params: { event: event.merge(concert_id: concert.id, place: place.id) }, headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Event.all.count }.by(1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        post '/api/v1/events', params: { event: event.merge(concert_id: concert.id, place: place.id) }, headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      let(:another_event) { attributes_for(:event) }

      it 'did not add new event to db' do
        expect do
          post '/api/v1/events', params: { event: event.merge(concert_id: concert.id, place: place.id) }, headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Event.all.count }.by(0)
      end
    end

    context 'as a quest' do
      before {
        post '/api/v1/events', params: { event: event.merge(concert_id: concert.id, place: place.id) }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_event) { attributes_for(:event) }

      it 'did not add new event to db' do
        expect do
          post '/api/v1/events', params: { event: event.merge(concert_id: concert.id, place: place.id) }
        end .to change { Event.all.count }.by(0)
      end
    end
  end

  describe 'request to delete event' do
    context 'as an admin' do
      let(:events) { create_list(:event, 3) }
      let(:event_id) { events.first.id }
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        delete "/api/v1/events/#{event_id}", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      let(:another_event_id) { events.last.id }

      it 'deletes event from db' do
        expect do
          delete "/api/v1/events/#{another_event_id}", headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Event.all.count }.by(-1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:events) { create_list(:event, 3) }
      let(:event_id) { events.first.id }
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        delete "/api/v1/events/#{event_id}", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      let(:another_event_id) { events.last.id }

      it 'did not deletes event from db' do
        expect do
          delete "/api/v1/events/#{another_event_id}", headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Event.all.count }.by(0)
      end
    end

    context 'as a quest' do
      let(:events) { create_list(:event, 3) }
      let(:event_id) { events.first.id }

      before {
        delete "/api/v1/events/#{event_id}"
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_event_id) { events.last.id }

      it 'did not deletes event from db' do
        expect do
          delete "/api/v1/events/#{another_event_id}"
        end .to change { Event.all.count }.by(0)
      end
    end
  end

  describe 'request to update event' do
    context 'as an admin' do
      let(:event) { create(:event, :with_tickets) }
      let(:event_id) { event.id }
      let(:event_updates) { {event: attributes_for(:event)} }
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        patch "/api/v1/events/#{event_id}", params: event_updates, headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'render updated event data' do
        expect(json[:event]).to_not be_empty
      end
    end

    context 'as a logged user (not admin)' do
      let(:event) { create(:event, :with_tickets) }
      let(:event_id) { event.id }
      let(:event_updates) { attributes_for(:event) }
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        patch "/api/v1/events/#{event_id}", params: { event: event_updates }, headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      let(:another_event) { create(:event, :with_tickets) }
      let(:another_event_id) { another_event.id }
      let(:another_event_updates) { attributes_for(:event) }

      it 'does not update event in db' do
        expect do
          patch "/api/v1/events/#{another_event_id}", params: { event: another_event_updates }, headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to_not change { Event.find(another_event_id).place }
      end
    end

    context 'as a quest' do
      let(:event) { create(:event, :with_tickets) }
      let(:event_id) { event.id }
      let(:event_updates) { attributes_for(:event) }

      before {
        patch "/api/v1/events/#{event_id}", params: { event: event_updates }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_event) { create(:event, :with_tickets) }
      let(:another_event_id) { another_event.id }
      let(:another_event_updates) { attributes_for(:event) }

      it 'does not update event in db' do
        expect do
          patch "/api/v1/events/#{another_event_id}", params: { event: another_event_updates }
        end .to_not change { Event.find(another_event_id).place }
      end
    end
  end
end
