# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Clearance::Controller

  rescue_from CanCan::AccessDenied do |exception|
    render json: {error: 'Nie masz uprawnień do tej akcji.'}, status: :forbidden
  end

  def current_user
    @current_user ||= User.find(doorkeeper_token[:resource_owner_id])
  end
end
