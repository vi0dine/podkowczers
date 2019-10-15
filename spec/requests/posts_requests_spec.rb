require 'rails_helper'

RSpec.describe 'Posts', type: :request do
  describe 'request list of all posts' do
    let!(:posts) { create_list(:post, 6) }

    before {
      get '/api/v1/posts'
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render all posts data' do
      expect(json['data'].size).to eq(6)
    end
  end
end