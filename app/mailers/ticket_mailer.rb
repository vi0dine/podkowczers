# frozen_string_literal: true

class TicketMailer < ApplicationMailer
  def reservation(user, event, tickets_pdf)
    @event = event

    attachments['bilety_depodkowczers'] = tickets_pdf
    mail(to: user.email, from: 'depodkowczers@gmail.com', subject: 'Potwierdzenie rezerwacji')
  end
end
