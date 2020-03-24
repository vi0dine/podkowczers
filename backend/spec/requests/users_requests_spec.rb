require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe 'request list of all users' do
    context 'as an admin' do
      let!(:users) { create_list(:user, 2) }
      let(:user) { create(:user, :admin) }
      let(:token) { get_access_token(user) }

      before {
        get '/api/v1/users', headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render all users data' do
        expect(json[:users].size).to eq(3)
      end
    end

    context 'as an user' do
      let!(:users) { create_list(:user, 5) }
      let(:user) { create(:user, role: 'user') }
      let(:token) { get_access_token(user) }

      before {
        get '/api/v1/users', headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'renders only current user' do
        expect(json[:users].count).to eq(1)
      end
    end

    context 'as a quest' do
      let!(:users) { create_list(:user, 2) }

      before {
        get '/api/v1/users'
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe 'request single user data' do
    context 'as and admin' do
      let!(:users) { create_list(:user, 2) }
      let(:user_id) { users.first.id }
      let(:user) { create(:user, :admin) }
      let(:token) { get_access_token(user) }

      before {
        get "/api/v1/users/#{user_id}", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render user data by given id' do
        expect(json[:user][:id].to_i).to eq(user_id)
      end

      it 'render user data' do
        expect(json[:user]).to include(
                                   id: User.find(user_id).id,
                                   email: User.find(user_id).email,
                                   role: User.find(user_id).role,
                                   coins: User.find(user_id).coins_count,
                                   tickets: User.find(user_id).tickets.to_a,
                                   reservations: User.find(user_id).reservations.to_a
                               )
      end
    end

    context 'as an user' do
      let!(:users) { create_list(:user, 2) }
      let(:user_id) { users.first.id }
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        get "/api/v1/users/#{user_id}", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'as aquest' do
      let!(:users) { create_list(:user, 2) }
      let(:user_id) { users.first.id }

      before {
        get "/api/v1/users/#{user_id}"
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe 'request to delete a user' do
    context 'as an admin' do
      let(:users) { create_list(:user, 4) }
      let(:user_id) { users.first.id }
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        delete "/api/v1/users/#{user_id}", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      let(:another_user_id) { users.last.id }

      it 'deletes user from db' do
        expect do
          delete "/api/v1/users/#{another_user_id}", headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { User.all.count }.by(-1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:users) { create_list(:user, 4) }
      let(:user_id) { users.first.id }
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        delete "/api/v1/users/#{user_id}", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      let(:another_user_id) { users.last.id }

      it 'not delete user from db' do
        expect do
          delete "/api/v1/users/#{another_user_id}", headers: {
              "Authorization": "Bearer #{token}"
          }
        end .to change { User.all.count }.by(0)
      end
    end

    context 'as a quest' do
      let(:users) { create_list(:user, 4) }
      let(:user_id) { users.first.id }

      before {
        delete "/api/v1/users/#{user_id}"
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_user_id) { users.last.id }

      it 'not delete user from db' do
        expect do
          delete "/api/v1/users/#{another_user_id}"
        end .to change { User.all.count }.by(0)
      end
    end
  end

  describe 'request to promote user' do
    context 'as an admin' do
      let(:user) { create(:user) }
      let(:admin) { create(:user, :admin) }
      let(:token) { get_access_token(admin) }

      before {
        post "/api/v1/users/#{user.id}/promote", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render updated user data' do
        expect(json[:user]).to_not be_empty
        expect(User.find(user.id).role).to eq('admin')
      end
    end

    context 'as a logged user (not admin)' do
      let(:userro) { create(:user) }
      let(:user) { create(:user) }
      let(:token) { get_access_token(user) }

      before {
        post "/api/v1/users/#{userro.id}/promote", headers: {
            "Authorization": "Bearer #{token}"
        }
      }

      it 'respond with code 403' do
        expect(response).to have_http_status(:forbidden)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context 'as a quest' do
      let(:userro) { create(:user) }

      before {
        post "/api/v1/users/#{userro.id}/promote"
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
end
