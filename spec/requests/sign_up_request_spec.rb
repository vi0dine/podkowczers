require 'rails_helper'

RSpec.describe 'Sign up', type: :request do
  describe 'signing up user with valid data' do
    before { post '/signup', params: attributes_for(:user) }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render csrf token' do
      expect(json['csrf']).to_not be_empty
    end

    it 'assign jwt to the cookie' do
      expect(response.cookies['jwt_access']).to_not be_empty
    end

    it 'add user to the db' do
      expect { post '/signup', params: attributes_for(:user) }.to change{ User.count }.by(1)
    end

    it 'creates user with role :user' do
      expect(User.last.role).to eq('user')
    end
  end

  describe 'signing up user with invalid data' do
    before { post '/signup', params: { email: 'jasadas@dasd', password: '12345678' } }

    it 'respond with code 422' do
      expect(response).to have_http_status(:unprocessable_entity)
    end

    it 'did not add user to the db' do
      expect do
        post '/signup', params: { email: 'jasadas@dasd', password: '12345678' }
      end.to change { User.count }.by(0)
    end
  end
end
