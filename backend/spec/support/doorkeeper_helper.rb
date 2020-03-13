def get_access_token(user)
  post '/oauth/token', params: {
      email: user.email,
      password: user.password,
      grant_type: 'password',
      client_id: Doorkeeper::Application.last.uid,
      client_secret: Doorkeeper::Application.last.secret
  }

  @token = json[:access_token]
end