Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts, only: %i[index show create update destroy]
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
