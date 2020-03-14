require 'rails_helper'

RSpec.describe 'Sign in', type: :request do
  describe 'signing in user who exists' do
    let(:user) { create(:user) }

    context 'with correct credentials' do
      before { post '/oauth/token', params: {
          email: user.email,
          password: user.password,
          grant_type: 'password',
          client_id: Doorkeeper::Application.last.uid,
          client_secret: Doorkeeper::Application.last.secret
      } }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render response with access token' do
        expect(json[:access_token]).to_not be_empty
        expect(json[:email]).to eq(user.email)
        expect(json[:role]).to eq(user.role)
      end
    end

    context 'with incorrect password' do
      before { post '/oauth/token', params: {
          email: user.email,
          password: user.password+"ssdfsdfsdf",
          grant_type: 'password',
          client_id: Doorkeeper::Application.last.uid,
          client_secret: Doorkeeper::Application.last.secret
      } }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render errors' do
        expect(json[:message]).to eq('Błędne dane logowania')
      end
    end
  end

  describe 'signing in user who does not exist' do
    before { post '/oauth/token', params: {
        email: "fsdfsdfsdfsdf",
        password: "sdfsdsdfsdfsd",
        grant_type: 'password',
        client_id: Doorkeeper::Application.last.uid,
        client_secret: Doorkeeper::Application.last.secret
    } }

    it 'respond with code 401' do
      expect(response).to have_http_status(:unauthorized)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render errors' do
      expect(json[:message]).to eq('Błędne dane logowania')
    end
  end
end
