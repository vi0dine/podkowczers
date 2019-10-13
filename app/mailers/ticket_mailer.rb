# frozen_string_literal: true

class TicketMailer < ApplicationMailer
  def reservation(user_id, event_id, tickets_pdf)
    @user = User.find(user_id)
    @event = Event.find(event_id)
    @concert = @event.concert.name

    attachments['bilety_depodkowczers'] = tickets_pdf
    mail(to: @user.email, from: 'depodkowczers@gmail.com', subject: 'Potwierdzenie rezerwacji')
  end
end
