# frozen_string_literal: true

Rails.application.routes.draw do
  resources :passwords, controller: "clearance/passwords", only: [:create, :new]
  resource :session, controller: "clearance/sessions", only: [:create]

  get "/sign_in", controller: "api/v1/users", action: :new, as: "sign_in"
  delete "/sign_out" => "clearance/sessions#destroy", as: "sign_out"

  use_doorkeeper
  apipie

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :users do
        get '/login', controller: :sessions, action: :create
        post '/coin', controller: :users, action: :add_coin
        post '/promote', controller: :users, action: :promote
        post '/demote', controller: :users, action: :demote
        resource :password,
                 controller: "clearance/passwords",
                 only: [:edit, :update]
      end


      resources :posts, only: %i[index show create update destroy] do
        resources :comments, only: %i[index show create destroy]
      end
      resources :reviews, only: %i[index create update destroy]
      resources :concerts, only: %i[index show create update destroy]
      resources :events, only: %i[index show create update destroy]
      resources :tickets, only: %i[index destroy] do
        post 'return', controller: :tickets, action: :return
      end

      post :tickets, controller: :tickets, action: :reserve, as: 'reserve_tickets'
    end
  end
end
