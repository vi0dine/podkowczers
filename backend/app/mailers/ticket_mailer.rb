# frozen_string_literal: true

class TicketMailer < ApplicationMailer
  def reservation(user, event, attachment)
    @event = event

    attachments['bilety_depodkowczers.pdf'] = attachment.blob.download
    mail(to: user.email, from: 'depodkowczers@gmail.com', subject: 'Potwierdzenie rezerwacji')
  end
end
