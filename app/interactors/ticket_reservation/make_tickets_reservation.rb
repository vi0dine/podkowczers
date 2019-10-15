# frozen_string_literal: true

module TicketReservation
  class MakeTicketsReservation
    include Interactor::Organizer

    organize TicketReservation::ParseRequest,
             TicketReservation::FindRequestedTickets,
             TicketReservation::UpdateTickets,
             TicketReservation::EncryptReservation,
             TicketReservation::GenerateQrCode,
             TicketReservation::MakePdfAttachment,
             TicketReservation::SendReservation,
             TicketReservation::MarkAsMailed
  end
end
