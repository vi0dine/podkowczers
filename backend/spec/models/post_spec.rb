require 'rails_helper'

RSpec.describe Post, type: :model do
  context do
    it { should validate_presence_of(:title) }
    it { should validate_uniqueness_of(:title).case_insensitive }
    it { should validate_length_of(:title).is_at_least(3) }
    it { should validate_presence_of(:body) }
    it { should validate_length_of(:body).is_at_most(11_500) }
    it { should belong_to(:user) }
    it { should have_many(:posts_tags) }
    it { should have_many(:tags).through(:posts_tags) }
    it { should have_many(:comments) }
  end
end
