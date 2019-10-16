# frozen_string_literal: true

class Ticket < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :event

  validates :sector,
            presence: true,
            length: { is: 1 }

  validates :row,
            presence: true,
            numericality: { only_integers: true,
                            greater_than: 0,
                            less_than: 100 }
  validates :seat,
            presence: true,
            uniqueness: { scope: %i[sector row event_id] },
            numericality: { only_integers: true,
                            greater_than: 0,
                            less_than: 100 }
  validates :reserved,
            inclusion: { in: [true, false] }
  validates :mailed,
            inclusion: { in: [true, false] }

  def mark_as_reserved
    with_lock do
      self.reserved = true
      self.save!
    end
  end

  def mark_as_free
    with_lock do
      self.reserved = false
      self.save!
    end
  end

  def mark_as_mailed
    with_lock do
      self.mailed = true
      self.save!
    end
  end
end
