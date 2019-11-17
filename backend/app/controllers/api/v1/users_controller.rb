module Api
  module V1
    class UsersController < ApplicationController
      before_action :authorize_access_request!

      def show
        @user = current_user
        render json: { user: { email: @user.email, coins: @user.coins_count, reservations: @user.user_reservations } }
      end
    end
  end
end