# frozen_string_literal: true

def json
  JSON.parse(response.body)
end
