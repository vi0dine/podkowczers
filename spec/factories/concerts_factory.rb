# frozen_string_literal: true

FactoryBot.define do
  factory :concert do
    name { "#{Faker::Music.band} Concert" }
    description { Faker::Lorem.characters(number: 1500) }

    trait :with_events do
      after(:create) do |concert|
        create_list :event, 3, :with_tickets, concert: concert
      end
    end
  end
end
