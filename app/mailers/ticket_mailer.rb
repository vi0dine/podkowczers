# frozen_string_literal: true

class TicketMailer < ApplicationMailer
  def reservation(user, event, pdf_path)
    @event = event

    attachments['bilety_depodkowczers.pdf'] = File.read(pdf_path)
    mail(to: user.email, from: 'depodkowczers@gmail.com', subject: 'Potwierdzenie rezerwacji')
  end
end
