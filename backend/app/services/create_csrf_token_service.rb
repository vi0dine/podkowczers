# frozen_string_literal: true

class CreateCsrfTokenService
  def initialize(user, response)
    @user_id = user.id
    @user_role = user.role
    @response = response
  end

  def call
    generate_tokens
    set_cookies
    tokens
  end

  private

  attr_reader :user_id, :user_role
  attr_accessor :response, :tokens

  def create_session
    JWTSessions::Session.new(payload: payload,
                             refresh_by_access_allowed: true)
  end

  def set_cookies
    response.set_cookie(JWTSessions.access_cookie,
                        value: tokens[:access],
                        httponly: true,
                        secure: Rails.env.production?)
  end

  def generate_tokens
    self.tokens = create_session.login
  end

  def payload
    { 'user_id': user_id, 'user_role': user_role }
  end
end
