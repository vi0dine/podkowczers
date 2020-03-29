json.tickets do
  json.array! @tickets do |ticket|
    json.id ticket.id
    json.sector ticket.sector
    json.row ticket.row
    json.seat ticket.seat
    json.event do
      json.id ticket.event.id
      json.name ticket.event.concert.name
      json.place do
        json.id ticket.event.place.id
        json.name ticket.event.place.name
      end
    end
    json.reserved ticket.reserved
  end
end