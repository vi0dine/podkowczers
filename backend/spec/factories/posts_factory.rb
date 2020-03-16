# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    body { Faker::Lorem.characters(number: 500) }
    permalink { Faker::Lorem.characters(number: 20) }
    attachments { { type: 'image', src: 'sdfsdfsdfsdfsf' } }
    created_time { Faker::Time.backward }
  end
end
