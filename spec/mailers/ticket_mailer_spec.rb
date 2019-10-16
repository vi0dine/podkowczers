require 'rails_helper'

describe TicketMailer do
  describe 'reservation' do
    context 'headers' do
      let(:user) { create(:user) }
      let(:event) { create(:event, :with_tickets) }
      let(:attachment_path) { Rails.root.join("pdfs/tickets.pdf") }
      let(:mail) { TicketMailer.reservation(user, event, attachment_path) }

      it 'renders the subject' do
        expect(mail.subject).to eq('Potwierdzenie rezerwacji')
      end

      it 'sends to the right email' do
        expect(mail.to).to include(user.email)
      end

      it 'renders the from email' do
        expect(mail.from).to include('depodkowczers@gmail.com')
      end
    end

    context 'body' do
      let(:user) { create(:user) }
      let(:event) { create(:event, :with_tickets) }
      let(:attachment_path) { Rails.root.join("pdfs/tickets.pdf") }
      let(:mail) { TicketMailer.reservation(user, event, attachment_path) }

      it 'includes event place' do
        expect(mail.body.encoded).to include(event.place)
      end

      it 'includes event starts at' do
        expect(mail.body.encoded).to include(event.starts_at.strftime("%d/%m/%Y %H:%M"))
      end
    end
  end
end
