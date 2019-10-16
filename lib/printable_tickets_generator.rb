# frozen_string_literal: true

require 'fileutils'

class PrintableTicketsGenerator
  def initialize(save_path, tickets_data)
    @ac = ActionController::Base.new
    @save_path = save_path
    @tickets_data = tickets_data
  end

  def call
    generate_pdf_file
  end

  private

  attr_reader :save_path, :tickets_data, :ac

  def generate_pdf_file
    create_dirs
    printable_tickets = format_to_printable_tickets
    create_pdf_file(printable_tickets)
  end

  def create_dirs
    dirname = File.dirname(save_path)
    unless File.directory?(dirname)
      FileUtils.mkdir_p(dirname)
    end
  end

  def format_to_printable_tickets
    WickedPdf.new.pdf_from_string(
      ac.render_to_string(template: 'tickets/tickets.pdf.erb',
                          layout: 'pdf.html',
                          locals: { tickets: tickets_data })
    )
  end

  def create_pdf_file(tickets)
    File.open(save_path, 'wb') do |file|
      file << tickets
    end
  end
end
