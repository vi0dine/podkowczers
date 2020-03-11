# frozen_string_literal: true

module Api
  module V1
    class SignUpController < ApplicationController
      def create
        user = User.new(user_params)
        user.coins_count = 1

        if user.save
          tokens = CreateCsrfTokenService.new(user, response).call
            render json: {
              id: user.id,
              email: user.email,
              coins: user.coins_count,
              # avatar: user.user_avatar,
              reservations: user.user_reservations,
              role: user.role,
              csrf: tokens[:csrf],
              access: tokens[:access]
            }
        else
          render json: { error: user.errors.full_messages.join(' ') }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.permit(:email, :password, :password_confirmation)
      end
    end
  end
end
