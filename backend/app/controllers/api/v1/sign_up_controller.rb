# frozen_string_literal: true

module Api
  module V1
    class SignUpController < ApplicationController
      def create
        user = User.new(user_params)

        if user.save
          token = CreateCsrfTokenService.new(user, response).call
          render json: { id: user.id, role: user.role, csrf: token }
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
