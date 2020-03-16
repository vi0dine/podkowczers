require 'rails_helper'

RSpec.describe Post, type: :model do
  context do
    it { should validate_presence_of(:created_time) }
    it { should validate_presence_of(:permalink) }
    it { should validate_uniqueness_of(:permalink).case_insensitive }
  end
end
