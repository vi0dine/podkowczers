json.tickets do
  json.array! @tickets do |ticket|
    json.id ticket.id
    json.code ticket.qr_code
    json.concert ticket.event.concert.name
    json.place do
      json.id ticket.event.place.id
      json.name ticket.event.place.name
    end
    json.sector ticket.sector
    json.row ticket.row
    json.seat ticket.seat
    json.date ticket.event.starts_at
    json.reserved ticket.reserved
    json.reserved_at ticket.updated_at
  end
end