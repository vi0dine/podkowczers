# frozen_string_literal: true

JWTSessions.encryption_key =
  Rails.env.production? ? ENV['SECRET_KEY_BASE'] : Rails.application.credentials.secret_key_base
