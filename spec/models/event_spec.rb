require 'rails_helper'

RSpec.describe Event, type: :model do
  context 'valid Event' do
    it { should belong_to(:concert) }
    it { should have_many(:reviews) }
    it { should have_many(:tickets) }
    it { should validate_presence_of(:place) }
    it { should validate_length_of(:place).is_at_least(5).is_at_most(200) }
    it { should validate_presence_of(:starts_at) }
    # TODO: Validates starts_at is in the future
    it { should validate_presence_of(:estimated_length) }
    it { should validate_numericality_of(:estimated_length).is_greater_than_or_equal_to(900) }
  end
end
