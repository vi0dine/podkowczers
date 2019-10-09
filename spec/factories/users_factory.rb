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

    # after(:create) do |user|
    #   create_list :post, 3, user: user
    #   create_list :comment, 5, user: user
    #   create_list :review, 2, user: user
    #   create_list :ticket, 10, user: user
    # end
  end
end
