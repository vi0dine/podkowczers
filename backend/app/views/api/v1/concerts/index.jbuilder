json.concerts do
  json.array! @concerts do |concert|
    json.id concert.id
    json.name concert.name
    json.description concert.description
    json.images concert.photos_paths
    json.available_tickets_count concert.available_tickets_count
    json.events do
      json.array! concert.events do |event|
        json.id event.id
      end
    end
  end
end