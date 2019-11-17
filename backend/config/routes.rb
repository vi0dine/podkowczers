Rails.application.routes.draw do
  default_url_options :host => "http://localhost:4000"

  namespace :api do
    namespace :v1 do
      resources :users, only: %i[show]
      resources :posts, only: %i[index show create update destroy] do
        resources :comments, only: %i[index create destroy]
      end
      resources :reviews, only: %i[index create update destroy]
      resources :concerts, only: %i[index show create update destroy]
      resources :events, only: %i[index show create update destroy]
      resources :tickets, only: %i[index]
        post :tickets, controller: :tickets, action: :reserve, as: 'reserve_tickets'
    end
  end

  post '/signup', controller: :sign_up, action: :create
  post '/signin', controller: :sign_in, action: :create
  post '/refresh', controller: :refresh, action: :create
  delete '/signout', controller: :sign_in, action: :destroy
end