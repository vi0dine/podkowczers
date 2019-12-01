# frozen_string_literal: true

module Api
  module V1
    class SignInController < ApplicationController
      before_action :authorize_access_request!, only: [:destroy]

      def create
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
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
          not_found
        end
      end

      def destroy
        session = JWTSessions::Session.new(payload: payload)
        session.flush_by_access_payload
        render json: :ok
      end

      private

      def not_found
        render json: { error: 'Nie znaleziono użytkownika o takich danych.' }, status: :not_found
      end
    end
  end
end
