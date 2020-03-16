require 'rails_helper'

RSpec::Matchers.define_negated_matcher :not_change, :change

RSpec.describe 'Posts', type: :request do
  describe 'request list of all posts' do
    let!(:posts) { create_list(:post, 6) }
    let(:user) { create(:user) }
    let(:token) { get_access_token(user) }

    before {
      get '/api/v1/posts', headers: {
          "Authorization": "Bearer #{token}"
      }
    }

    it 'respond with code 200' do
      warn response.status
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render all posts data' do
      expect(json[:posts].count).to eq(6)
      expect(json[:posts]).to all(have_key(:id))
      expect(json[:posts]).to all(have_key(:body))
      expect(json[:posts]).to all(have_key(:permalink))
      expect(json[:posts]).to all(have_key(:attachments))
      expect(json[:posts]).to all(have_key(:created_at))
    end
  end
end
