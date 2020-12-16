json.tickets do
  json.array! @tickets do |ticket|
    json.hash ticket.private_hash
  end
end