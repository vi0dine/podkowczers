# frozen_string_literal: true

FactoryBot.define do
  factory :concert do
    name { Faker::Music.band }
    description { Faker::Lorem.characters(number: 1500) }

    after(:create) do |concert|
      create_list :event, 3, concert: concert
    end
  end
end
