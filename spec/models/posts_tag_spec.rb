require 'rails_helper'

RSpec.describe PostsTag, type: :model do
  context 'valid PostTag' do
    it { should belong_to(:post) }
    it { should belong_to(:tag) }  
  end
end
