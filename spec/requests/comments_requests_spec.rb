require 'rails_helper'

RSpec.describe 'Comments', type: :request do
  describe 'request to get all posts comments' do
    let!(:posts) { create_list(:post, 6, :with_comments) }
    let(:post_id) { posts.first.id }

    before {
      get "/api/v1/posts/#{post_id}/comments"
    }

    it 'respond with code 200' do
      expect(response).to have_http_status(:ok)
    end

    it 'respond with JSON' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'render all comments for post with given id' do
      expect(json['data'].size).to eq(posts.first.comments.size)
    end
  end

  describe 'request to add a comment' do
    let!(:posts) { create_list(:post, 6, :with_comments) }
    let(:post_id) { posts.first.id }
    let(:new_comment) { attributes_for(:comment) }

    context 'as a logged in user' do
      let(:user) { create(:user) }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        post "/api/v1/posts/#{post_id}/comments", params: { comment: new_comment },
                                                  headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 201' do
        expect(response).to have_http_status(:created)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'render new comment data' do
        expect(json['data']).to_not be_empty
      end

      let(:another_comment) { attributes_for(:comment) }

      it 'add new comment to db' do
        expect do
          post "/api/v1/posts/#{post_id}/comments", params: { comment: another_comment },
                                                    headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Post.find(post_id).comments.size }.by(1)
      end
    end

    context 'as a quest' do
      before {
        post "/api/v1/posts/#{post_id}/comments", params: { comment: new_comment }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      let(:another_comment) { attributes_for(:comment) }

      it 'does not add new comment to db' do
        expect do
          post "/api/v1/posts/#{post_id}/comments", params: { comment: another_comment }
        end .to_not change { Post.find(post_id).comments.size }
      end
    end
  end
end