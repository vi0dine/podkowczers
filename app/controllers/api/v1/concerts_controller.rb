# frozen_string_literal: true

module Api
  module V1
    class ConcertsController < ApplicationController
      def index
        @concerts = Concert.all
        render json: ConcertSerializer.new(@concerts).serializable_hash
      end
    end
  end
end
