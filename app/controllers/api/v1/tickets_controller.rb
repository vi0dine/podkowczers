# frozen_string_literal: true

module Api
  module V1
    class TicketsController < ApplicationController
      before_action :authorize_access_request!
      before_action :admin?, only: [:index]

      def index
        @tickets = Ticket.all
        render json: TicketSerializer.new(@tickets).serializable_hash
      end

      def reserve
        @requested_tickets = []
        tickets_ids = params['tickets']
        tickets_ids.each do |ticket_id|
          @requested_tickets << Ticket.find(ticket_id)
        end

        @requested_tickets.each do |ticket|
          ticket.update(
            reserved: true,
            user: current_user
          )
        end

        render json: TicketSerializer.new(@requested_tickets).serializable_hash
      end
    end
  end
end
