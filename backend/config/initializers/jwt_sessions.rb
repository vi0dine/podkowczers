# frozen_string_literal: true

JWTSessions.encryption_key = ENV['SECRET_KEY_BASE']
JWTSessions.algorithm   = "RS256"
JWTSessions.private_key = OpenSSL::PKey::RSA.generate(2048)
JWTSessions.public_key  = JWTSessions.private_key.public_key