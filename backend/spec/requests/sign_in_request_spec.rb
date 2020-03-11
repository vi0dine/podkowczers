require 'rails_helper'

RSpec.describe 'Sign in', type: :request do
  describe 'signing in user who exists' do
    let(:user) { create(:user) }

    context 'with correct credentials' do
      before { post '/api/v1/signin', params: {email: user.email, password: user.password} }

      it 'respond with code 200' do
        expect(response).to have_http_status(:ok)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render csrf token' do
        expect(json['csrf']).to_not be_empty
      end
    end

    context 'with incorrect password' do
      before { post '/api/v1/signin', params: { email: user.email, password: "#{user.password}asdasda" } }

      it 'respond with code 404' do
        expect(response).to have_http_status(:not_found)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render errors' do
        expect(json['error']).to eq('Cannot find email/password combination')
      end
    end
  end

  describe 'signing in user who does not exist' do
    before { post '/api/v1/signin', params: { email: 'asdasda@dsfsdfs.com', password: '12314345346456'} }

    it 'respond with code 404' do
      expect(response).to have_http_status(:not_found)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render errors' do
      expect(json['error']).to eq('Cannot find email/password combination')
    end
  end
end
