# frozen_string_literal: true

module Api
  module V1
    class UserSerializer
      include FastJsonapi::ObjectSerializer
      attributes :id, :email, :role, :coins_count, :created_at
      attribute :tickets do |user|
        user.tickets
      end
      attribute :comments do |user|
        user.comments
      end
      attribute :reviews do |user|
        user.reviews
      end
    end
  end
end
