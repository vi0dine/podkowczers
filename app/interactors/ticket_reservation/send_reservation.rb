# frozen_string_literal: true

module TicketReservation
  class SendReservation
    include Interactor

    def call
      # TODO: Improve pdf design
      # File.open('./ticket.pdf', 'wb') do |file|
      #   file << context.pdf_attachment
      # end
      TicketMailer.reservation(context.user.id, context.requested_tickets.first.event.id, context.pdf_attachment)
    end
  end
end