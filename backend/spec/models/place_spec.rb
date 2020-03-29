require 'rails_helper'

RSpec.describe Place, type: :model do
  context do
    let(:place) { create(:place) }
    it { should have_many(:events) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:plan) }
  end
end
