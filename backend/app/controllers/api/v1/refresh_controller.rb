# frozen_string_literal: true

module Api
  module V1
    class RefreshController < ApplicationController
      before_action :authorize_refresh_by_access_request!

      def create
        session = JWTSessions::Session.new(payload: claimless_payload, refresh_by_access_allowed: true)
        tokens  = session.refresh_by_access_payload
        response.set_cookie(JWTSessions.access_cookie,
                            value: tokens[:access],
                            httponly: true,
                            secure: Rails.env.production?)

        render json: { csrf: tokens[:csrf] }
      end
    end
  end
end
