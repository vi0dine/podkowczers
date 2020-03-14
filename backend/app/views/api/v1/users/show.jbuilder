json.user do
  json.id @user.id
  json.email @user.email
  json.coins @user.coins_count
  json.tickets do
    json.array! @user.tickets do |ticket|
      json.id ticket.id
      json.code ticket.qr_code
      json.concert ticket.event.concert.name
      json.place ticket.event.place
      json.sector ticket.sector
      json.row ticket.row
      json.seat ticket.seat
      json.date ticket.event.starts_at
      json.reserved_at ticket.updated_at
    end
  end
  json.reservations @user.user_reservations
end