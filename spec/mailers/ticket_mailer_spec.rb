require 'rails_helper'

describe TicketMailer do
  describe 'reservation' do
    context 'headers' do
      let(:user) { create(:user) }
      let(:event) { create(:event, :with_tickets) }
      let(:attachment) { nil } # TODO: PDF GENERATION
      let(:mail) { TicketMailer.reservation(user, event, attachment) }

      it 'renders the subject' do
        expect(mail.subject).to eq('Potwierdzenie rezerwacji miejsc')
      end

      it 'sends to the right email' do
        expect(mail.to).to eq(user.email)
      end

      it 'renders the from email' do
        expect(mail.from).to eq('depodkowczers@gmail.com')
      end
    end

    context 'body' do
      let(:user) { create(:user) }
      let(:mail) { TicketMailer.reservation(user, event, attachment) }
      let(:event) { create(:event, :with_tickets) }
      let(:attachment) { nil } # TODO: PDF GENERATION

      it 'includes event place' do
        let(:user) { create(:user) }
        let(:mail) { TicketMailer.reservation(user, event, attachment) }

        expect(mail.body.encoded).to include(event.place)
      end

      it 'includes event starts at' do
        let(:user) { create(:user) }
        let(:mail) { TicketMailer.reservation(user, event, attachment) }

        expect(mail.body.encoded).to include(event.starts_at)
      end

      it 'includes concert name' do
        let(:user) { create(:user) }
        let(:mail) { TicketMailer.reservation(user, event, attachment) }

        expect(mail.body.encoded).to include(event.concert.name)
      end
    end
  end
end
