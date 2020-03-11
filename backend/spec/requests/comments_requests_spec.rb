require 'rails_helper'

RSpec.describe 'Comments', type: :request do
  describe 'request to get all posts comments' do
    let!(:posts) { create_list(:post, 6, :with_comments) }
    let(:post_id) { posts.first.id }

    before {
      get "/api/v1/comments",
      params: {post_id: post_id}
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
        post "/api/v1/comments", params: { comment: new_comment, post_id: post_id },
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
          post "/api/v1/comments", params: { comment: another_comment, post_id: post_id },
                                                    headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Post.find(post_id).comments.size }.by(1)
      end
    end

    context 'as a quest' do
      before {
        post "/api/v1/comments", params: { comment: new_comment, post_id: post_id }
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
          post "/api/v1/comments", params: { comment: another_comment, post_id: post_id }
        end .to_not change { Post.find(post_id).comments.size }
      end
    end
  end

  describe 'request to delete a comment' do
    let!(:posts) { create_list(:post, 6, :with_comments) }
    let(:post_id) { posts.first.id }

    context 'as an admin' do
      let(:admin) { create(:user, :admin) }
      let(:comments) { create_list(:comment, 3, post: posts.first) }
      let(:comment_id) { comments.first.id }
      let(:another_comment_id) { comments.last.id }

      before {
        @tokens = session(admin)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        delete "/api/v1/comments/#{comment_id}",
               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 204' do
        expect(response).to have_http_status(:no_content)
      end

      let(:another_comment) { create(:comment, post: posts.first) }

      it 'deletes comment from db' do
        expect do
          delete "/api/v1/comments/#{another_comment_id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Post.find(post_id).comments.size }.by(-1)
      end
    end

    context 'as an owner' do
      let(:user) { create(:user) }
      let(:comments) { create_list(:comment, 3, post: posts.first, user: user) }
      let(:comment_id) { comments.first.id }
      let(:another_comment_id) { comments.last.id }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        delete "/api/v1/comments/#{comment_id}",
               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 204' do
        expect(response).to have_http_status(:no_content)
      end

      let(:another_comment) { create(:comment, user: user, post: posts.first) }

      it 'deletes comment from db' do
        expect do
          delete "/api/v1/comments/#{another_comment_id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to change { Post.find(post_id).comments.size }.by(-1)
      end
    end

    context 'as a logged in user (not owner)' do
      let(:user) { create(:user) }
      let(:comments) { create_list(:comment, 5, post: posts.first) }
      let(:comment_id) { comments.first.id }
      let(:another_comment_id) { comments.last.id }

      before {
        @tokens = session(user)
        cookies[JWTSessions.access_cookie] = @tokens[:access]
        delete "/api/v1/comments/#{comment_id}",
               headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'does not delete comment from db' do
        expect do
          delete "/api/v1/comments/#{another_comment_id}",
                 headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        end .to_not change { Post.find(post_id).comments.size }
      end
    end

    context 'as a quest' do
      let(:comments) { create_list(:comment, 5, post: posts.first) }
      let(:comment_id) { comments.first.id }
      let(:another_comment_id) { comments.last.id }

      before {
        delete "/api/v1/comments/#{comment_id}"
      }

      it 'respond with code 401' do
        expect(response).to have_http_status(:unauthorized)
      end

      it 'respond with JSON' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'does not delete comment from db' do
        expect do
          delete "/api/v1/comments/#{another_comment_id}"
        end .to_not change { Post.find(post_id).comments.size }
      end
    end
  end
end
