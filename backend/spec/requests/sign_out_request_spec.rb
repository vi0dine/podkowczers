require 'rails_helper'

RSpec.describe 'Sign out', type: :request do
  describe 'signing out user' do
    let(:user) { create(:user) }

    before do
      post '/signin', params: { email: user.email, password: user.password }
      delete '/api/v1/signout', headers: { 'X-CSRF-TOKEN': json['csrf'] }
    end

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render ok message' do
      expect(json).to eq('ok')
    end
  end
end
