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
        result = TicketReservation::MakeTicketsReservation.call(tickets_ids: params[:tickets], user: current_user)
        if result.success?
          render json: TicketSerializer.new(result.requested_tickets.map{|x| x.values[0]}).serializable_hash
        else
          render json: { error: result.message }, status: :unprocessable_entity
        end
      end
    end
  end
end
