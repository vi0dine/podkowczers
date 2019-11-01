# frozen_string_literal: true

def session(user)
  payload = { user_id: user.id }
  session = JWTSessions::Session.new(payload: payload)
  session.login
end
