module Api
  module V1
    class UsersController < Clearance::UsersController
      before_action :doorkeeper_authorize!, except: [:create]
      load_and_authorize_resource except: [:create]

      api!
      def index; end

      def create
        @user = user_from_params

        if @user.save
          sign_in(@user) do |status|
            if status.success?
              render 'api/v1/users/show'
            end
          end
        else
          render json: { errors: '' }, status: :unprocessable_entity
        end
      end

      api!
      def show; end

      api!
      def add_coin
        authorize! :add_coin, User
        @user = User.find(params[:user_id])
        if @user.add_coins(1)
          render 'show'
        else
          render json: {error: @user.errors.full_messages.join("\n")}, status: :unprocessable_entity
        end
      end

      api!
      def promote
        authorize! :promote, User
        @user = User.find(params[:user_id])
        if @user.promote
          render 'show'
        else
          render json: {error: @user.errors.full_messages.join(' ')}, status: :unprocessable_entity
        end
      end

      api!
      def demote
        authorize! :demote, User
        @user = User.find(params[:user_id])
        if @user.demote
          render 'show'
        else
          render json: {error: @user.errors.full_messages.join(' ')}, status: :unprocessable_entity
        end
      end

      api!
      def destroy
        if @user.destroy
          render 'show'
        else
          render json: {error: @user.errors.full_messages.join(' ')}, status: :unprocessable_entity
        end
      end

      api!
      def logout
        authorize! :logout, User
        sign_out
      end

      private

      def user_params
        params.require(:user).permit(%i[id email password])
      end
    end
  end
end