# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    sequence(:title) { |n| "#{Faker::Book.title} #{n}" }
    body { Faker::Lorem.characters(number: 500) }
    rate { Faker::Number.between(from: 0, to: 5) }
    user
    event
  end
end
