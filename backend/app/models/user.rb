# frozen_string_literal: true

class User < ApplicationRecord
  include Clearance::User
  has_many :access_grants,
           class_name: 'Doorkeeper::AccessGrant',
           foreign_key: :resource_owner_id,
           dependent: :delete_all # or :destroy if you need callbacks

  has_many :access_tokens,
           class_name: 'Doorkeeper::AccessToken',
           foreign_key: :resource_owner_id,
           dependent: :delete_all # or :destroy if you need callbacks

  include Rails.application.routes.url_helpers

  has_one_attached :avatar
  has_many_attached :reservations
  has_many :reviews
  has_many :tickets, -> { order(updated_at: :desc) }

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

  def assign_ticket(ticket)
    tickets << ticket
  end

  def dissociate_ticket(ticket)
    tickets.delete(ticket)
  end
  
  def return_ticket(ticket)
    with_lock do
      dissociate_ticket(ticket)
      ticket.update(reserved: false, mailed: false)
      # ticket.revoke_qr TODO: QR in database
      add_coins(1)
      save!
    end
  end

  def add_coins(amount)
    update(coins_count: self.coins_count += amount)
    save!
  end

  def decrement_coins_count
    decrement!(:coins_count)
  end

  def promote
    update(role: 'admin')
  end

  def demote
    update(role: 'user')
  end

  def user_avatar
    polymorphic_url(avatar.blob)
  end

  def user_reservations
    links = []
    reservations.blobs.sort_by { |reservation | reservation.created_at }.reverse.each do |reservation|
      links << { date: reservation.created_at, link: polymorphic_url(reservation, only_path: true) }
    end
    links
  end
end
