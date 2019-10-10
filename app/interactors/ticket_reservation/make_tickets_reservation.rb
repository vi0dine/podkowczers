# frozen_string_literal: true

module TicketReservation
  class MakeTicketsReservation
    include Interactor::Organizer

    organize TicketReservation::ParseRequest,
             TicketReservation::FindRequestedTickets,
             TicketReservation::UpdateTickets,
             TicketReservation::EncryptReservation,
             TicketReservation::GenerateBarcode,
             TicketReservation::SendReservation
  end
end
