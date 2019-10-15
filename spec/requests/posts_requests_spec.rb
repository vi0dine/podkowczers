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

  describe 'request single post' do
    let!(:posts) { create_list(:post, 3, :with_comments) }
    let(:post_id) { posts.first.id }

    before {
      get "/api/v1/posts/#{post_id}"
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render post data with given id' do
      expect(json['data']['id'].to_i).to eq(post_id)
    end

    it 'render all commentss' do
      expect(json['data']['relationships']['comments']['data'].size).to eq(posts.first.comments.size)
    end
  end
end
