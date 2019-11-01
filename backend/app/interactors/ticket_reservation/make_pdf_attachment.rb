# frozen_string_literal: true

module TicketReservation
  class MakePdfAttachment
    include Interactor

    def call
      context.save_path =
        Rails.root.join(
          "pdfs/#{context.requested_tickets.first[:ticket].event.id}/#{context.user.id}",
          'tickets.pdf'
        )
      begin
        pdf = PrintableTicketsGenerator.new(context.requested_tickets).call
        context.user.reservations
          .attach(
            io: StringIO.new(pdf), filename: 'tickets.pdf', content_type: 'application/pdf'
          )
      rescue Exception => e
        puts e.message
        context.fail!(message: 'Nie można było utworzyć pliku PDF z biletami. Rezerwacja została anulowana.
                       Prosimy spróbować później lub powiadomić administratora o występującym problemie')
      end
    end
  end
end
