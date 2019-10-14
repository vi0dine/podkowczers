require 'rails_helper'

describe TicketMailer do
  describe 'reservation' do
    context 'headers' do
      let(:user) { create(:user) }
      let(:event) { create(:event, :with_tickets) }
      let(:attachment) { WickedPdf.new.pdf_from_string('<h1>Hello There!</h1>') }
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

    context 'body' do
      let(:user) { create(:user) }
      let(:event) { create(:event, :with_tickets) }
      let(:attachment) { WickedPdf.new.pdf_from_string('<h1>Hello There!</h1>') }
      let(:mail) { TicketMailer.reservation(user, event, attachment) }

      it 'includes event place' do
        expect(mail.body.encoded).to include(event.place)
      end

      it 'includes event starts at' do
        expect(mail.body.encoded).to include(event.starts_at.to_s)
      end

      it 'includes concert name' do
        expect(mail.body.encoded).to include(event.concert.name)
      end
    end
  end
end
