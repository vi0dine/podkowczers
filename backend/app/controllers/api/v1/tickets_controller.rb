# frozen_string_literal: true

module Api
  module V1
    class TicketsController < ApplicationController
      before_action :doorkeeper_authorize!
      load_and_authorize_resource

      api!

      def index;
      end

      api!

      def reserve
        authorize! :reserve, Ticket

        result = TicketReservation::MakeTicketsReservation.call(tickets_ids: params[:tickets], user: current_user)

        if result.success?
          @tickets = Ticket.where(id: params[:tickets])
          render 'reserve', status: :ok
        else
          render json: {error: result.message}, status: :unprocessable_entity
        end
      end

      api!

      def return
        @ticket = Ticket.find(params[:ticket_id])
        @user = @ticket.user
        authorize! :return, @ticket

        if @user.return_ticket(@ticket)
          render 'return', status: :ok
        else
          render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
      end

      api!

      def destroy
        if @ticket.destroy
          render 'destroy', status: :ok
        else
          render json: {error: @ticket.errors.full_messages.join(' ')}, status: :unprocessable_entity
        end
      end

      private

      def ticket_params
        params.require(:ticket).permit(:id)
      end
    end
  end
end
