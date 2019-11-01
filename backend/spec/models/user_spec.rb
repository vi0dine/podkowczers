require 'rails_helper'

RSpec.describe User, type: :model do
  context do
    it { should validate_presence_of(:email) }
    it { should allow_value('user@example.com').for(:email) }
    it { should_not allow_value('user').for(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_presence_of(:password) }
    it { should validate_length_of(:password).is_at_least(8) }
    it { should validate_confirmation_of(:password) }
    it { should validate_presence_of(:role) }
    it { should define_enum_for(:role).with_values(%i[user manager admin]) }
    it { should validate_presence_of(:coins_count) }
    it { should validate_numericality_of(:coins_count).is_greater_than_or_equal_to(0) }
    it { should have_secure_password }

    it { should have_many(:posts) }
    it { should have_many(:comments) }
    it { should have_many(:reviews) }
    it { should have_many(:tickets) }
  end
end
