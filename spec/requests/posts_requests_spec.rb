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

  describe 'request to add new post' do
    let(:new_post) { attributes_for(:post) }

    context 'as an admin' do
      let(:admin) { create(:user, :admin) }

      before {
        @tokens = session(admin)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        post '/api/v1/posts', params: { post: new_post },
                              headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 201' do
        expect(response).to have_http_status(:created)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render new post data' do
        expect(json['data']).to_not be_empty
      end

      let(:another_post) { attributes_for(:post) }

      it 'add new post to db' do
        expect do
          post '/api/v1/posts', params: { post: another_post },
                                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Post.all.count }.by(1)
      end
    end

    context 'as a logged user (not admin)' do
      let(:user) { create(:user) }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        post '/api/v1/posts', params: { post: new_post },
                              headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_post) { attributes_for(:post) }

      it 'did not add new post to db' do
        expect do
          post '/api/v1/posts', params: { post: another_post },
                                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Post.all.count }.by(0)
      end
    end

    context 'as a quest' do
      before {
        post '/api/v1/events', params: { post: new_post }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      let(:another_post) { attributes_for(:post) }

      it 'did not add new post to db' do
        expect do
          post '/api/v1/posts', params: { post: another_post }
        end .to change { Post.all.count }.by(0)
      end
    end
  end
end
