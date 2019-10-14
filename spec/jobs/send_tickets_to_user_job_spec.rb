require 'rails_helper'

RSpec.describe SendTicketsToUserJob, type: :job do

  before {
    allow(TicketMailer).to receive_message_chain(:reservation, :deliver_now)
  }

  describe '#perform' do
    let(:user) { create(:user) }
    let(:event) { create(:event, :with_tickets) }
    let(:attachment) { WickedPdf.new.pdf_from_string('<h1>Hello There!</h1>') }

    it 'calls on the TicketMailer' do
      allow(User).to receive(:find).and_return(user)

      SendTicketsToUserJob.new.perform(user.id, event.id, attachment)

      expect(TicketMailer).to have_received(:reservation)
    end
  end

  describe '.perform_later' do
    it 'adds the job to the queue :user_invites' do
      allow(TicketMailer).to receive_message_chain(:reservation, :deliver_now)

      SendTicketsToUserJob.perform_later(1)

      expect(enqueued_jobs.last[:job]).to eq(SendTicketsToUserJob)
    end
  end
end
