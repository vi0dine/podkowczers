require 'rails_helper'

RSpec.describe User, type: :model do
  context 'valid user' do
    it { should validate_presence_of(:email) }
    it { should allow_value('user@example.com').for(:email) }
    it { should_not allow_value('user').for(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_presence_of(:password) }
    it { should ensure_length_of(:password).is_at_least(8) }
    it { should validate_presence_of(:password_confirmation) }
    it { should validate_presence_of(:role) }
    it { should define_enum_for(:role).with_values(%i[user manager admin]) }
    it { should validate_presence_of(:coins_count) }
    it { should validate_numericality_of(:coins_count).only_integer }
    it { should have_secure_password }
  end
end
