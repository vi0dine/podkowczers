# frozen_string_literal: true

require 'fileutils'

class PrintableTicketsGenerator
  def initialize(tickets_data)
    @ac = ActionController::Base.new
    @tickets_data = tickets_data
  end

  def call
    generate_pdf_file
  end

  private

  attr_reader :tickets_data, :ac

  def generate_pdf_file
    WickedPdf.new.pdf_from_string(
      ac.render_to_string(template: 'tickets/tickets.pdf.erb',
                          layout: 'pdf.html',
                          locals: { tickets: tickets_data })
    )
  end
end
