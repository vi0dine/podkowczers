require 'rails_helper'

RSpec.describe Event, type: :model do
  context do
    let(:post) { create(:post) }
    it { should belong_to(:concert) }
    it { should belong_to(:place) }
    it { should have_many(:reviews) }
    it { should have_many(:tickets) }
    it { should validate_presence_of(:starts_at) }
    it { should validate_presence_of(:estimated_length) }
    it { should validate_numericality_of(:estimated_length).is_greater_than_or_equal_to(30) }
  end
end
