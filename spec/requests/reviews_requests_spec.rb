require 'rails_helper'

RSpec.describe 'Reviews', type: :request do
  describe 'request list of all reviews' do
    let!(:reviews) { create_list(:review, 3) }

    before {
      get '/api/v1/reviews'
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render all revies data' do
      expect(json['data'].size).to eq(3)
    end
  end

  describe 'request to post new review' do
    let(:user) { create(:user) }
    let(:event) { create(:event) }
    let(:review) { attributes_for(:review, event_id: event.id) }

    context 'as a login user' do
      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        post '/api/v1/reviews', params: { review: review },
                                headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 201' do
        expect(response).to have_http_status(:created)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      let(:another_review) { attributes_for(:review, event_id: event.id) }

      it 'add new review to db' do
        expect do
          post '/api/v1/reviews', params: { review: another_review },
                                  headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Review.all.count }.by(1)
      end
    end

    context 'as a quest' do
      before {
        post '/api/v1/reviews', params: { review: review }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      let(:another_review) { attributes_for(:review, event_id: event.id) }

      it 'did not add new review to db' do
        expect do
          post '/api/v1/reviews', params: { review: another_review }
        end .to change { Review.all.count }.by(0)
      end
    end
  end
end
