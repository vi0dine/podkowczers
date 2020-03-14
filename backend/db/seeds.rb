Doorkeeper::Application.create(
    name: 'Test App',
    redirect_uri: 'http://localhost:8000'
)

concert = Concert.create(name: 'Romeo i Julia', description: 'Zasadniczo o niczym szczególnym')

event = Event.create(place: 'Szkoła', starts_at: '2019-11-03', estimated_length: 9000, concert: concert)

for i in 1..10 do
  for j in 1..20 do
    Ticket.create(row: i, seat: j, sector: 'A', event: event)
  end
end