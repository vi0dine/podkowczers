# frozen_string_literal: true

module TicketReservation
  class ParseRequest
    include Interactor

    def call
      context.fail!(message: 'Nie podano miejsc') if context.tickets_ids.empty?
    end
  end
end
