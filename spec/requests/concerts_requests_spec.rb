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
    let!(:concerts) { create_list(:concert, 2, :with_events) }
    let(:concert_id) { concerts.first.id }

    before {
      Concert.find(concert_id).tickets.first.update(reserved: true)
      get "/api/v1/concerts/#{concert_id}" 
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render concert data by given id' do
      expect(json['data']['id'].to_i).to eq(concert_id)
    end

    it 'render available tickets count' do
      expect(json['data']['attributes']['tickets_count']).to eq(59)
    end
  end

  describe 'request to delete a concert' do
    context 'as an admin' do
      let(:concerts) { create_list(:concert, 4) }
      let(:concert_id) { concerts.sample.id }
      let(:admin) { create(:user, :admin) }

      before {
        @tokens = session(admin)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        delete "/api/v1/concerts/#{concert_id}",
               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 204' do
        expect(response).to have_http_status(:no_content)
      end

      let(:another_concert_id) { concerts.sample.id }

      it 'deletes concert from db' do
        expect do
          delete "/api/v1/concerts/#{another_concert_id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Concert.all.count }.by(-1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:concerts) { create_list(:concert, 4) }
      let(:concert_id) { concerts.sample.id }
      let(:user) { create(:user) }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        delete "/api/v1/concerts/#{concert_id}",
               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_concert_id) { concerts.sample.id }

      it 'not delete concert from db' do
        expect do
          delete "/api/v1/concerts/#{another_concert_id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Concert.all.count }.by(0)
      end
    end

    context 'as a quest' do
      let(:concerts) { create_list(:concert, 4) }
      let(:concert_id) { concerts.sample.id }

      before {
        delete "/api/v1/concerts/#{concert_id}"
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      let(:another_concert_id) { concerts.sample.id }

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

      before {
        @tokens = session(admin)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        post '/api/v1/concerts', params: { concert: concert },
                                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 201' do
        expect(response).to have_http_status(:created)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render new concert data' do
        expect(json['data']).to_not be_empty
      end

      let(:another_concert) { attributes_for(:concert) }

      it 'add new concert to db' do
        expect do
          post '/api/v1/concerts', params: { concert: another_concert },
                                   headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Concert.all.count }.by(1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:user) { create(:user) }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        post '/api/v1/concerts', params: { concert: concert },
                                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_concert) { attributes_for(:concert) }

      it 'did not add new concert to db' do
        expect do
          post '/api/v1/concerts', params: { concert: another_concert },
                                   headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
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

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      let(:another_concert) { attributes_for(:concert) }

      it 'did not add new concert to db' do
        expect do
          post '/api/v1/concerts', params: { concert: another_concert }
        end .to change { Concert.all.count }.by(0)
      end
    end
  end
end
