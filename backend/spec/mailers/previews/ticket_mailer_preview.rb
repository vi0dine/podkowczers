# Preview all emails at http://localhost:3000/rails/mailers/ticket_mailer
class TicketMailerPreview < ActionMailer::Preview
  def reservation
    user = FactoryBot.create(:user)
    event = FactoryBot.create(:event)
    pdf = WickedPdf.new.pdf_from_string('<h1>Hello There!</h1>')
    TicketMailer.reservation(user, event, pdf)
  end
end
