require 'rails_helper'

RSpec.describe 'Refresh', type: :request do
  describe 'refreshing user session' do
    let(:user) { create(:user) }

    before do
      post '/oauth/token', params: {
          email: user.email,
          password: user.password,
          grant_type: 'password',
          client_id: Doorkeeper::Application.last.uid,
          client_secret: Doorkeeper::Application.last.secret
      }
      @refresh_token = json[:refresh_token]
      @old_token = json[:access_token]
      post '/oauth/token', params: {
          grant_type: 'refresh_token',
          refresh_token: @refresh_token,
          client_id: Doorkeeper::Application.last.uid,
          client_secret: Doorkeeper::Application.last.secret
      }
    end

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render access token' do
      expect(json[:access_token]).to_not be_empty
    end

    it 'render NEW csrf token' do
      expect(json[:access_token]).to_not eq(@old_token)
    end
  end
end
