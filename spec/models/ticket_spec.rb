require 'rails_helper'

RSpec.describe Ticket, type: :model do
  context do
    it { should validate_presence_of(:sector) }
    it { should validate_length_of(:sector).is_equal_to(1) }
    it { should validate_presence_of(:row) }
    it { should validate_numericality_of(:row).is_greater_than(0).is_less_than(100) }
    it { should validate_presence_of(:seat) }
    it { should validate_numericality_of(:seat).is_greater_than(0).is_less_than(100) }
    it { should validate_uniqueness_of(:seat).scoped_to(%i[sector row event_id]) }
    it { should validate_presence_of(:reserved) }
    it { should validate_presence_of(:mailed) }
    it { should belong_to(:user) }
    it { should belong_to(:event) }
  end
end
