require 'rails_helper'

RSpec.describe 'Reviews', type: :request do
  pending "should be refactored" do
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
      let(:review) { attributes_for(:review) }

      context 'as a login user' do
        before {
          @tokens = session(user)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          post '/api/v1/reviews', params: { review: review, event_id: event.id },
               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'responds with code 201' do
          expect(response).to have_http_status(:created)
        end

        it 'responds with JSON' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        it 'renders new review data' do
          expect(json['data']).to_not be_empty
        end


        let(:another_review) { attributes_for(:review) }

        it 'adds new review to db' do
          expect do
            post '/api/v1/reviews', params: { review: another_review, event_id: event.id },
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to change { Review.all.count }.by(1)
        end
      end

      context 'as a quest' do
        before {
          post '/api/v1/reviews', params: { review: review, event_id: event.id }
        }

        it 'responds with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'responds with JSON' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        let(:another_review) { attributes_for(:review) }

        it 'did not add new review to db' do
          expect do
            post '/api/v1/reviews', params: { review: another_review, event_id: event.id }
          end .to change { Review.all.count }.by(0)
        end
      end
    end

    describe 'request to delete the review' do
      let(:user) { create(:user) }
      let(:admin) { create(:user, :admin) }
      let(:reviews) { create_list(:review, 5) }

      context 'as a login user (not admin)' do
        before {
          @tokens = session(user)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          delete "/api/v1/reviews/#{reviews.first.id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'responds with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'did not delete review from db' do
          expect do
            delete "/api/v1/reviews/#{reviews.last.id}",
                   headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to change { Review.all.count }.by(0)
        end
      end

      context 'as an admin' do
        before {
          @tokens = session(admin)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          delete "/api/v1/reviews/#{reviews.first.id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'responds with code 200' do
          expect(response).to have_http_status(:ok)
        end

        let(:another_review_id) { reviews.last.id }

        it 'deletes review from db' do
          expect do
            delete "/api/v1/reviews/#{another_review_id}",
                   headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to change { Review.all.count }.by(-1)
        end
      end

      context 'as a quest' do
        before {
          delete "/api/v1/reviews/#{reviews.first.id}"
        }

        it 'responds with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'responds with JSON' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        it 'does not delete review from db' do
          expect do
            delete "/api/v1/reviews/#{reviews.last.id}"
          end .to change { Review.all.count }.by(0)
        end
      end
    end

    describe 'request to update review' do
      context 'as an owner (logged in user)' do
        let(:user) { create(:user) }
        let(:review) { create(:review, user: user) }
        let(:review_updates) { attributes_for(:review) }

        before {
          @tokens = session(user)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          patch "/api/v1/reviews/#{review.id}", params: { review: review_updates },
                headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'respond with code 200' do
          expect(response).to have_http_status(:ok)
        end

        it 'respond with JSON' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        it 'render updated review data' do
          expect(json['data']).to_not be_empty
        end

        let(:another_review) { create(:review, user: user) }
        let(:another_review_updates) { attributes_for(:review) }

        it 'updates review in db' do
          expect do
            patch "/api/v1/reviews/#{another_review.id}", params: { review: another_review_updates },
                  headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to change { Review.find(another_review.id).title }
                      .from(another_review.title).to(another_review_updates[:title])
        end
      end

      context 'as an admin' do
        let(:admin) { create(:user, :admin) }
        let(:review) { create(:review) }
        let(:review_updates) { attributes_for(:review) }

        before {
          @tokens = session(admin)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          patch "/api/v1/reviews/#{review.id}", params: { review: review_updates },
                headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'respond with code 200' do
          expect(response).to have_http_status(:ok)
        end

        it 'respond with JSON' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        it 'render updated review data' do
          expect(json['data']).to_not be_empty
        end

        let(:another_review) { create(:review) }
        let(:another_review_updates) { attributes_for(:review) }

        it 'updates review in db' do
          expect do
            patch "/api/v1/reviews/#{another_review.id}", params: { review: another_review_updates },
                  headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to change { Review.find(another_review.id).title }
                      .from(another_review.title).to(another_review_updates[:title])
        end
      end

      context 'as an logged in user (not owner)' do
        let(:user) { create(:user) }
        let(:review) { create(:review) }
        let(:review_updates) { attributes_for(:review) }

        before {
          @tokens = session(user)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          patch "/api/v1/reviews/#{review.id}", params: { review: review_updates },
                headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'respond with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        let(:another_review) { create(:review) }
        let(:another_review_updates) { attributes_for(:review) }

        it 'does not update review in db' do
          expect do
            patch "/api/v1/reviews/#{another_review.id}", params: { review: another_review_updates },
                  headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to_not change { Review.find(another_review.id).title }
        end
      end

      context 'as a quest' do
        let(:review) { create(:review) }
        let(:review_updates) { attributes_for(:review) }

        before {
          patch "/api/v1/reviews/#{review.id}", params: { review: review_updates }
        }

        it 'respond with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'respond with JSON' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        let(:another_review) { create(:review) }
        let(:another_review_updates) { attributes_for(:review) }

        it 'does not update review in db' do
          expect do
            patch "/api/v1/reviews/#{another_review.id}", params: { review: another_review_updates }
          end .to_not change { Review.find(another_review.id).title }
        end
      end
    end
  end
end
