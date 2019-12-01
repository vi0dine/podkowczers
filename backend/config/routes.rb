# frozen_string_literal: true

Rails.application.routes.draw do
  default_url_options host: 'http://localhost:4000'

  namespace :api do
    namespace :v1 do
      resources :users, only: %i[index show destroy] do
        post '/coin', controller: :users, action: :add_coin
        post '/promote', controller: :users, action: :promote
        post '/demote', controller: :users, action: :demote
      end
      resources :posts, only: %i[index show create update destroy]
      resources :comments, only: %i[index create destroy]
      resources :reviews, only: %i[index create update destroy]
      resources :concerts, only: %i[index show create update destroy]
      resources :events, only: %i[index show create update destroy]
      resources :tickets, only: %i[index destroy]
      post :tickets, controller: :tickets, action: :reserve, as: 'reserve_tickets'

      post '/signup', controller: :sign_up, action: :create
      post '/signin', controller: :sign_in, action: :create
      post '/refresh', controller: :refresh, action: :create
      delete '/signout', controller: :sign_in, action: :destroy
    end
  end
end
