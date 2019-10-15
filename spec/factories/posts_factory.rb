# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "#{Faker::Book.title} #{n}" }
    body { Faker::Lorem.characters(number: 500) }
    user

    trait :with_comments do
      after(:create) do |post|
        create_list :comment, 10, post: post
      end
    end

    trait :with_tags do
      after(:create) do |post|
        create_list :tag, 10, post: post
      end
    end

    trait :with_comments_and_tags do
      after(:create) do |post|
        create_list :tag, 10, posts: [post]
        create_list :comment, 10, post: post
      end
    end
  end
end
