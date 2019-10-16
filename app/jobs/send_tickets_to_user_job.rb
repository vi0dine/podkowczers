# frozen_string_literal: true

class SendTicketsToUserJob < ApplicationJob
  queue_as :user_tickets

  def perform(user_id, event_id, pdf_path)
    user = User.find(user_id)
    event = Event.find(event_id)

    TicketMailer.reservation(user, event, pdf_path).deliver_now
  end
end
