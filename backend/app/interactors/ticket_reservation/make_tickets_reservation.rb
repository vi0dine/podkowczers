# frozen_string_literal: true

module TicketReservation
  class MakeTicketsReservation
    include Interactor::Organizer

    organize TicketReservation::FindRequestedTickets,
             TicketReservation::MarkAsReserved,
             TicketReservation::AssignTicketsToUser,
             TicketReservation::EncryptReservation,
             TicketReservation::GenerateQrCode,
             TicketReservation::MakePdfAttachment,
             TicketReservation::SendReservation
  end
end
