# frozen_string_literal: true

FactoryBot.define do
  factory :place do
    name { Faker::Address.city }
    plan { {
        sectors: [
            {name: "Sala", rows: [
                {id: 1, seats: 20},
                {id: 2, seats: 20},
                {id: 3, seats: 20},
                {id: 4, seats: 20},
                {id: 5, seats: 20},
                {id: 6, seats: 20},
                {id: 7, seats: 20},
                {id: 8, seats: 20},
                {id: 9, seats: 20},
                {id: 10, seats: 20},
            ]}
        ]
    } }
  end
end