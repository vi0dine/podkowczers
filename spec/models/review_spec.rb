require 'rails_helper'

RSpec.describe Review, type: :model do
  context do
    it { should validate_presence_of(:title) }
    it { should validate_length_of(:title).is_at_least(3).is_at_most(50) }
    it { should validate_uniqueness_of(:title).case_insensitive }
    it { should validate_presence_of(:body) }
    it { should validate_length_of(:body).is_at_least(10).is_at_most(2000) }
    it { should validate_presence_of(:rate) }
    it {
      should validate_numericality_of(:rate)
        .is_greater_than_or_equal_to(0)
        .is_less_than_or_equal_to(5)
    }
    it { should belong_to(:user) }
    it { should belong_to(:event) }
  end
end
