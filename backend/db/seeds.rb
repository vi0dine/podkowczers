require 'open-uri'

Doorkeeper::Application.create(
    name: 'DePodkowczers Mobile',
    redirect_uri: ''
)

concert = Concert.create(name: 'Mamma Mia', description: Faker::Lorem.paragraph_by_chars(number: 1200))
image = open('https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/14064161_889336681172605_6742123849404741008_n.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=5Gv5n5n5y7EAX9GZPLn&_nc_ht=scontent-frx5-1.xx&oh=f61662d419d53cbe1b84525076bb421a&oe=5E98FBAE');
concert.image.attach(io: image, filename: 'test_image.jpg')

event1 = Event.create(place: 'II Liceum Ogólnokształcące, Al. Wyzwolenia 34', starts_at: '2020-09-03', estimated_length: 9000, concert: concert)

concert = Concert.create(name: 'Romeo i Julia', description: Faker::Lorem.paragraph_by_chars(number: 1200))
image = open('https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/14064161_889336681172605_6742123849404741008_n.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=5Gv5n5n5y7EAX9GZPLn&_nc_ht=scontent-frx5-1.xx&oh=f61662d419d53cbe1b84525076bb421a&oe=5E98FBAE');
concert.image.attach(io: image, filename: 'test_image.jpg')

event2 = Event.create(place: 'II Liceum Ogólnokształcące, Al. Wyzwolenia 34', starts_at: '2020-09-03', estimated_length: 9000, concert: concert)

concert = Concert.create(name: 'Osiecka w II LO', description: Faker::Lorem.paragraph_by_chars(number: 1200))
image = open('https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/14064161_889336681172605_6742123849404741008_n.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=5Gv5n5n5y7EAX9GZPLn&_nc_ht=scontent-frx5-1.xx&oh=f61662d419d53cbe1b84525076bb421a&oe=5E98FBAE');
concert.image.attach(io: image, filename: 'test_image.jpg')

event3 = Event.create(place: 'II Liceum Ogólnokształcące, Al. Wyzwolenia 34', starts_at: '2020-09-03', estimated_length: 9000, concert: concert)

concert = Concert.create(name: 'Metro', description: Faker::Lorem.paragraph_by_chars(number: 1200))
image = open('https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/14064161_889336681172605_6742123849404741008_n.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=5Gv5n5n5y7EAX9GZPLn&_nc_ht=scontent-frx5-1.xx&oh=f61662d419d53cbe1b84525076bb421a&oe=5E98FBAE');
concert.image.attach(io: image, filename: 'test_image.jpg')

event4 = Event.create(place: 'II Liceum Ogólnokształcące, Al. Wyzwolenia 34', starts_at: '2020-09-03', estimated_length: 9000, concert: concert)

for i in 1..10 do
  for j in 1..20 do
    Ticket.create(row: i, seat: j, sector: 'A', event: event1)
    Ticket.create(row: i, seat: j, sector: 'A', event: event2)
    Ticket.create(row: i, seat: j, sector: 'A', event: event3)
    Ticket.create(row: i, seat: j, sector: 'A', event: event4)
  end
end

FacebookApiService.new.call
puts "NAME: #{Doorkeeper::Application.last.name}"
puts "ID: #{Doorkeeper::Application.last.uid}"
puts "SECRET: #{Doorkeeper::Application.last.secret}"