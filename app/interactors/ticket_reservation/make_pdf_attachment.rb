# frozen_string_literal: true

module TicketReservation
  class MakePdfAttachment
    include Interactor

    def call
      ac = ActionController::Base.new

      context.pdf_attachment = WickedPdf.new.pdf_from_string(
        ac.render_to_string(template: 'tickets/tickets.pdf.erb',
                            layout: 'pdf.html',
                            locals: { codes: context.qr_codes,
                                      tickets: context.requested_tickets })
      )
    end
  end
end
