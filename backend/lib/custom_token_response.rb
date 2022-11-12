# frozen_string_literal: true

module CustomTokenResponse
  def body
    additional_data = {
        id: @token.resource_owner_id,
        email: User.find(@token.resource_owner_id).email,
        role: User.find(@token.resource_owner_id).role,
    }

    super.merge(additional_data)
    ...
  end
end