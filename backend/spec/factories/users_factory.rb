# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }
    role { :user }
    coins_count { Faker::Base.rand(20) }

    trait :admin do
      role { :admin }
    end

    trait :manager do
      role { :manager }
    end

    trait :with_tickets do
      after(:create) do |user|
        create_list :ticket, 5, user: user
      end
    end

    trait :with_posts_and_comments do
      after(:create) do |user|
        create_list :post, 3, user: user
        create_list :comment, 5, user: user
      end
    end

    trait :with_reviews do
      after(:create) do |user|
        create_list :review, 2, user: user
      end
    end
  end
end
