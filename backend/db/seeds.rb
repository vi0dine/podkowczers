Doorkeeper::Application.create(
    name: 'ePodkowczers',
    redirect_uri: ''
)

concert = Concert.create(name: 'Koncert Testowy', description: Faker::Lorem.paragraph_by_chars(number: 1200))

event = Event.create(place: 'II Liceum Ogólnokształcące, Al. Wyzwolenia 34', starts_at: '2020-09-03', estimated_length: 9000, concert: concert)

for i in 1..10 do
  for j in 1..20 do
    Ticket.create(row: i, seat: j, sector: 'A', event: event)
  end
end

FacebookApiService.new.call
puts "NAME: #{Doorkeeper::Application.last.name}"
puts "ID: #{Doorkeeper::Application.last.uid}"
puts "SECRET: #{Doorkeeper::Application.last.secret}"