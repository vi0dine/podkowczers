# frozen_string_literal: true

require 'printable_tickets_generator'

module TicketReservation
  class MakePdfAttachment
    include Interactor

    def call
      context.save_path = Rails.root.join("pdfs/#{context.requested_tickets.first[:ticket].event.id}/#{context.user.id}", 'tickets.pdf')

      PrintableTicketsGenerator.new(context.save_path, context.requested_tickets).call
    end
  end
end
