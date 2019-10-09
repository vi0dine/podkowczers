# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_many :posts
  has_many :comments
  has_many :reviews
  has_many :tickets

  enum role: %i[user manager admin].freeze

  validates :email,
            format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i },
            presence: true,
            uniqueness: { case_sensitive: false }
  validates :password,
            confirmation: true,
            allow_nil: true,
            length: { minimum: 8 }
  validates :role,
            presence: true,
            inclusion: { in: roles.keys }
  validates :coins_count,
            presence: true,
            numericality: { only_integers: true,
                            greater_than_or_equal_to: 0 }
end
