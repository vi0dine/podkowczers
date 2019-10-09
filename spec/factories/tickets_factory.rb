# frozen_string_literal: true

FactoryBot.define do
  factory :ticket do
    sector { Faker::Lorem.characters(number: 1) }
    row { Faker::Number.between(from: 1, to: 50) }
    seat { Faker::Number.between(from: 1, to: 99) }
    reserved { false }
    mailed { false }
    user { nil }
    event

    trait :reserved do
      reserved { true }
    end

    trait :mailed do
      mailed { true }
    end
  end
end
