json.tickets do
  json.array! @tickets do |ticket|
    json.id ticket[:ticket].id
    json.event ticket[:ticket].event_id
    json.sector ticket[:ticket].sector
    json.row ticket[:ticket].row
    json.seat ticket[:ticket].seat
    json.qr ticket[:qr_code]
  end
end