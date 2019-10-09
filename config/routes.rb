Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :concerts, only: %i[index show]
    end
  end

  post '/signup', controller: :sign_up, action: :create
  post '/signin', controller: :sign_in, action: :create
  post '/refresh', controller: :refresh, action: :create
  delete '/signout', controller: :sign_in, action: :destroy
end
