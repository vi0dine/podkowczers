# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    place { Faker::Address.city }
    starts_at { Faker::Time.forward }
    estimated_length { Faker::Number.between(from: 900, to: 10_000) }
    concert

    trait :with_tickets do
      after(:create) do |event|
        create_list :ticket, 50, event: event
      end
    end

    trait :with_reviews do
      after(:create) do |event|
        create_list :review, 2, event: event
      end
    end
  end
end
