require 'rails_helper'

RSpec.describe 'Concerts', type: :request do
  describe 'request list of all concerts' do
    let!(:concerts) { create_list(:concert, 2) }
    let(:user) { create(:user) }
    let(:token) { get_access_token(user) }

    before {
      get '/api/v1/concerts', headers: {
          "Authorization": "Bearer #{token}"
      }
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render all concerts data' do
      expect(json[:concerts].size).to eq(2)
    end
  end

  describe 'request single concert data' do
    let!(:concerts) { create_list(:concert, 2, :with_events) }
    let(:concert_id) { concerts.first.id }
    let(:user) { create(:user) }
    let(:token) { get_access_token(user) }

    before {
      Concert.find(concert_id).tickets.first.update(reserved: true)
      get "/api/v1/concerts/#{concert_id}", headers: {
          "Authorization": "Bearer #{token}"
      }
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render concert data by given id' do
      expect(json[:concert][:id].to_i).to eq(concert_id)
    end

    it 'render available tickets count' do
      expect(json[:concert][:available_tickets_count]).to eq(59)
    end
  end

  describe 'request to delete a concert' do
    context 'as an admin' do
      let(:concerts) { create_list(:concert, 4) }
      let(:concert_id) { concerts.first.id }
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        delete "/api/v1/concerts/#{concert_id}", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      let(:another_concert_id) { concerts.last.id }

      it 'deletes concert from db' do
        expect do
          delete "/api/v1/concerts/#{another_concert_id}", headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Concert.all.count }.by(-1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:concerts) { create_list(:concert, 4) }
      let(:concert_id) { concerts.first.id }
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        delete "/api/v1/concerts/#{concert_id}", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      let(:another_concert_id) { concerts.last.id }

      it 'not delete concert from db' do
        expect do
          delete "/api/v1/concerts/#{another_concert_id}", headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Concert.all.count }.by(0)
      end
    end

    context 'as a quest' do
      let(:concerts) { create_list(:concert, 4) }
      let(:concert_id) { concerts.first.id }

      before {
        delete "/api/v1/concerts/#{concert_id}"
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_concert_id) { concerts.last.id }

      it 'not delete concert from db' do
        expect do
          delete "/api/v1/concerts/#{another_concert_id}"
        end .to change { Concert.all.count }.by(0)
      end
    end
  end

  describe 'request to add new concert' do
    let(:concert) { attributes_for(:concert) }

    context 'as an admin' do
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        post '/api/v1/concerts', params: { concert: concert }, headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 201' do
        expect(response).to have_http_status(:created)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render new concert data' do
        expect(json[:concert]).to_not be_empty
      end

      let(:another_concert) { attributes_for(:concert) }

      it 'add new concert to db' do
        expect do
          post '/api/v1/concerts', params: { concert: another_concert }, headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Concert.all.count }.by(1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        post '/api/v1/concerts', params: { concert: concert }, headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      let(:another_concert) { attributes_for(:concert) }

      it 'did not add new concert to db' do
        expect do
          post '/api/v1/concerts', params: { concert: another_concert }, headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Concert.all.count }.by(0)
      end
    end

    context 'as a quest' do

      before {
        post '/api/v1/concerts', params: { concert: concert }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_concert) { attributes_for(:concert) }

      it 'did not add new concert to db' do
        expect do
          post '/api/v1/concerts', params: { concert: another_concert }
        end .to change { Concert.all.count }.by(0)
      end
    end
  end

  describe 'request to update concert' do
    let(:concert) { create(:concert) }
    let(:concert_updates) { attributes_for(:concert) }

    context 'as an admin' do
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        patch "/api/v1/concerts/#{concert.id}", params: { concert: concert_updates }, headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render updated concert data' do
        expect(json[:concert]).to_not be_empty
      end

      let(:another_concert) { create(:concert) }
      let(:another_concert_updates) { attributes_for(:concert) }

      it 'update concert in db' do
        expect do
          patch "/api/v1/concerts/#{another_concert.id}", params: { concert: another_concert_updates }, headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { Concert.find(another_concert.id).name }.from(another_concert.name).to(another_concert_updates[:name])
      end
    end

    context 'as a logged user (not admin)' do
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        patch "/api/v1/concerts/#{concert.id}", params: { concert: concert_updates }, headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      let(:another_concert) { create(:concert) }
      let(:another_concert_updates) { attributes_for(:concert) }

      it 'did not update concert in db' do
        expect do
          patch "/api/v1/concerts/#{another_concert.id}", params: { concert: another_concert_updates }, headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to_not change { Concert.find(another_concert.id) }
      end
    end

    context 'as a quest' do
      before {
        patch "/api/v1/concerts/#{concert.id}", params: { concert: concert_updates }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_concert) { create(:concert) }
      let(:another_concert_updates) { attributes_for(:concert) }

      it 'did not update concert in db' do
        expect do
          patch "/api/v1/concerts/#{another_concert.id}", params: { concert: another_concert_updates }
        end .to_not change { Concert.find(another_concert.id) }
      end
    end
  end
end
