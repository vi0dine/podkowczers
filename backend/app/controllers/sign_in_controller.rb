# frozen_string_literal: true

class SignInController < ApplicationController
  before_action :authorize_access_request!, only: [:destroy]

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = CreateCsrfTokenService.new(user, response).call
      render json: { csrf: token }
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
    render json: { error: 'Cannot find email/password combination' }, status: :not_found
  end
end
