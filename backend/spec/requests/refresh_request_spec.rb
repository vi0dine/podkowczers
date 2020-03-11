require 'rails_helper'

RSpec.describe 'Refresh', type: :request do
  describe 'refreshing user session' do
    let(:user) { create(:user) }

    before do
      post '/api/v1/signin', params: { email: user.email, password: user.password }
      @old_token = json['csrf']
      post '/api/v1/refresh', headers: { 'X-CSRF-TOKEN': @old_token }
    end

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render csrf token' do
      expect(json['csrf']).to_not be_empty
    end

    it 'render NEW csrf token' do
      expect(json['csrf']).to_not eq(@old_token)
    end
  end
end
