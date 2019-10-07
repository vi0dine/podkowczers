# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  context 'valid comment' do
    it { should validate_presence_of(:body) }
    it { should validate_length_of(:body).is_at_least(3).is_at_most(500) }
    it { should belong_to(:user) }
  end
end
