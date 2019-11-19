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

      def destroy
        @user = User.find(params[:id])
        if @user.delete
          render json: UserSerializer.new(@user).serializable_hash
        else
          render json: { error: @user.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(%i[id])
      end
    end
  end
end