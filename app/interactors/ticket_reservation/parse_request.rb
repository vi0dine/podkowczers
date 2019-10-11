# frozen_string_literal: true

module TicketReservation
  class ParseRequest
    include Interactor

    def call
      if context.tickets_ids.is_a? String
        context.tickets_ids = JSON.parse(context.tickets_ids)
      end

      if context.tickets_ids.empty?
        context.fail!(message: 'Nie podano miejsc')
      end
    end
  end
end
