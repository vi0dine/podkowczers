# frozen_string_literal: true

class SendTicketsToUserJob < ApplicationJob
  queue_as :user_tickets

  def perform(user_id, tickets_ids)
    tickets = Ticket.where(id: tickets_ids)
    user = User.find(user_id)
    event = Event.find(tickets.first.event_id)

    TicketMailer.reservation(user, event, user.reservations.last).deliver_now

    tickets.update(mailed: true)
  end
end
