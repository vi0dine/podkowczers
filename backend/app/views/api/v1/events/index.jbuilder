json.events do
  json.array! @events do |event|
    json.id event.id
    json.concert event.concert.name
    json.place event.place
    json.starts_at event.starts_at
    json.estimated_length event.estimated_length
    json.available_tickets_count event.available_tickets_count
    json.reservation_open event.reservation_open
    json.tickets do
      json.array! event.tickets do |ticket|
        json.id ticket.id
        json.sector ticket.sector
        json.row ticket.row
        json.seat ticket.seat
        json.reserved ticket.reserved
        json.mailed ticket.mailed
      end
    end
    json.reviews do
      json.array! event.reviews do |review|
        json.id review.id
        json.title review.title
        json.body review.body
        json.rate review.rate
      end
    end
  end
end