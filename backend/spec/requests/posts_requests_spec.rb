require 'rails_helper'

RSpec::Matchers.define_negated_matcher :not_change, :change

RSpec.describe 'Posts', type: :request do
  pending "should be refactored" do
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

    describe 'request to update post' do
      let(:existing_post) { create(:post) }
      let(:existing_post_id) { existing_post.id }
      let(:post_updates) { attributes_for(:post) }

      context 'as an admin' do
        let(:admin) { create(:user, :admin) }

        before {
          @tokens = session(admin)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          patch "/api/v1/posts/#{existing_post_id}", params: { post: post_updates },
                headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'responds with code 200' do
          expect(response).to have_http_status(:ok)
        end

        it 'responds with JSON' do
          expect(response.content_type).to eq('application/json; charset=utf-8')
        end

        it 'renders updated post data' do
          expect(json['data']).to_not be_empty
        end

        let(:another_post) { create(:post) }
        let(:another_post_updates) { attributes_for(:post) }

        it 'updates post in db' do
          expect do
            patch "/api/v1/posts/#{another_post.id}", params: { post: another_post_updates },
                  headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to change { Post.find(another_post.id).title }
                      .from(another_post.title).to(another_post_updates[:title])
        end
      end

      context 'as a logged user (not admin)' do
        let(:user) { create(:user) }

        before {
          @tokens = session(user)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          patch "/api/v1/posts/#{existing_post_id}", params: { post: post_updates },
                headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'respond with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        let(:another_post) { create(:post) }
        let(:another_post_updates) { attributes_for(:post) }

        it 'does not update post in db' do
          expect do
            patch "/api/v1/posts/#{another_post.id}", params: { post: another_post_updates },
                  headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to_not change { Post.find(another_post.id) }
        end
      end

      context 'as a quest' do
        before {
          patch "/api/v1/posts/#{existing_post_id}", params: { post: post_updates }
        }

        it 'respond with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        let(:another_post) { create(:post) }
        let(:another_post_updates) { attributes_for(:post) }

        it 'does not update post in db' do
          expect do
            patch "/api/v1/posts/#{another_post.id}", params: { post: another_post_updates }
          end .to_not change { Post.find(another_post.id) }
        end
      end
    end

    describe 'request to delete post' do
      let(:posts) { create_list(:post, 5, :with_comments_and_tags) }
      let(:existing_post_id) { posts.first.id }
      let(:another_post_id) { posts.last.id }

      context 'as an admin' do
        let(:admin) { create(:user, :admin) }

        before {
          @tokens = session(admin)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          delete "/api/v1/posts/#{existing_post_id}", headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'responds with code 204' do
          expect(response).to have_http_status(:no_content)
        end

        let(:another_post_id) { posts.last.id }

        it 'deletes post from db' do
          expect do
            delete "/api/v1/posts/#{another_post_id}", headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to change { Post.all.count }.by(-1)
                      .and change { Comment.all.count }.by(-posts.last.comments.size)
                               .and change { PostsTag.all.count }.by(-posts.last.posts_tags.size)
        end
      end

      context 'as a logged user (not admin)' do
        let(:user) { create(:user) }

        before {
          @tokens = session(user)
          cookies[JWTSessions.access_cookie] = @tokens[:access]
          delete "/api/v1/posts/#{existing_post_id}", headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
        }

        it 'respond with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'does not delete post in db' do
          expect do
            delete "/api/v1/posts/#{another_post_id}", headers: { JWTSessions.csrf_header.to_s => @tokens[:csrf].to_s }
          end .to not_change { Post.all.count }
                      .and not_change { Comment.all.count }
                               .and not_change { PostsTag.all.count }
        end
      end

      context 'as a quest' do
        before {
          delete "/api/v1/posts/#{existing_post_id}"
        }

        it 'respond with code 401' do
          expect(response).to have_http_status(:unauthorized)
        end

        it 'does not delete post in db' do
          expect do
            delete "/api/v1/posts/#{another_post_id}"
          end .to not_change { Post.all.count }
                      .and not_change { Comment.all.count }
                               .and not_change { PostsTag.all.count }
        end
      end
    end
  end
end
