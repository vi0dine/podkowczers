require 'rails_helper'

describe TicketMailer do
  describe 'reservation' do
    context 'headers' do
      let(:user) { create(:user) }
      let(:event) { create(:event, :with_tickets) }

      before {
        user.reservations.attach(io: StringIO.new(WickedPdf.new.pdf_from_string('<h1>Hello There!</h1>')), filename: 'tickets.pdf', content_type: 'application/pdf')
      }

      let(:attachment) { user.reservations.last }
      let(:mail) { TicketMailer.reservation(user, event, attachment) }

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
  end
end
