# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    body { Faker::Lorem.characters(number: 50) }
    user
    post
  end
end