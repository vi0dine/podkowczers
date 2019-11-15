# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

concert = Concert.create(name: 'Romeo i Julia', description: 'Zasadniczo o niczym szczególnym')
event = Event.create(place: 'Szkoła', starts_at: '2019-11-03', estimated_length: 9000, concert: concert)

for i in 1..10 do
  for j in 1..20 do
    Ticket.create(row: i, seat: j, sector: 'A', event: event)
  end
end