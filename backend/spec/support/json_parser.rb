# frozen_string_literal: true

def json
  JSON.parse(response.body)&.deep_symbolize_keys!
end
