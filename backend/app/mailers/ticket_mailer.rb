# frozen_string_literal: true

class TicketMailer < ApplicationMailer
  def reservation(user, event, attachment)
    @event = event
    attachments.inline['bg.jpg'] = File.read("#{Rails.root}/app/views/ticket_mailer/images/bg-shade.jpg")
    attachments.inline['deco.png'] = File.read("#{Rails.root}/app/views/ticket_mailer/images/deco.png")
    attachments.inline['logo.png'] = File.read("#{Rails.root}/app/views/ticket_mailer/images/logo.png")

    attachments['bilety_depodkowczers.pdf'] = attachment.blob.download
    mail(to: user.email, from: 'depodkowczers@gmail.com', subject: 'Potwierdzenie rezerwacji')
  end
end
