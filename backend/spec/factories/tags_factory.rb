# frozen_string_literal: true

FactoryBot.define do
  factory :tag do
    name { Faker::Lorem.characters(number: 15) }

    trait :with_posts do
      after(:create) do |tag|
        create_list :post, 10, tag: tag
      end
    end
  end
end
