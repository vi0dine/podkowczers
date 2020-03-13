module CustomTokenErrorResponse
  def body
    {
        status_code: 401,
        message: "Błędne dane logowania",
        result: []
    }
  end

  def status
    :unauthorized
  end
end