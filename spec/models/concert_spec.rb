require 'rails_helper'

RSpec.describe Concert, type: :model do
  context 'valid Concert' do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(3).is_at_most(50) }
    it { should validate_uniqueness_of(:name).case_insensitive }
    it { should validate_presence_of(:description) }
    it { should validate_length_of(:description).is_at_least(20).is_at_most(5000) }
    it { should have_many(:events) }
    it { should have_many(:tickets).through(:events) }
  end
end
