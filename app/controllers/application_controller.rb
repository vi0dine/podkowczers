# frozen_string_literal: true

class ApplicationController < ActionController::API
  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized

  private

  def current_user
    @current_user ||= User.find(payload['user_id'])
  end

  def admin?
    unless current_user.role == 'admin'
      head(401)
    end
  end

  def not_authorized
    render json: { error: 'Not authorized' }, status: :unauthorized
  end
end
