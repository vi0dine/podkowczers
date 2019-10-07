require 'rails_helper'

RSpec.describe Tag, type: :model do
  context do
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_least(2).is_at_most(20) }
    it { should have_many(:posts_tags) }
    it { should have_many(:posts).through(:posts_tags) }
  end
end
