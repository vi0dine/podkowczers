module Api
  module V1
    class UsersController < ApplicationController
      before_action :authorize_access_request!
      before_action :admin?, only: %i[index]

      def index
        @users = User.all
        render json: UserSerializer.new(@users).serializable_hash
      end

      def show
        @user = current_user
        render json: { user: { email: @user.email, coins: @user.coins_count, reservations: @user.user_reservations } }
      end
    end
  end
end