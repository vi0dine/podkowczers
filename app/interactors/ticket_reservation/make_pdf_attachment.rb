# frozen_string_literal: true

require 'fileutils'

module TicketReservation
  class MakePdfAttachment
    include Interactor

    def call
      ac = ActionController::Base.new

      pdf = WickedPdf.new.pdf_from_string(
        ac.render_to_string(template: 'tickets/tickets.pdf.erb',
                            layout: 'pdf.html',
                            locals: { tickets: context.requested_tickets })
      )

      context.save_path = Rails.root.join("pdfs/#{context.requested_tickets.first[:ticket].event.id}/#{context.user.id}", 'tickets.pdf')

      dirname = File.dirname(context.save_path)
      unless File.directory?(dirname)
        FileUtils.mkdir_p(dirname)
      end

      File.open(context.save_path, 'wb') do |file|
        file << pdf
      end
    end
  end
end
