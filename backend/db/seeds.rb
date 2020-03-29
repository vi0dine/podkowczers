require 'open-uri'

place1 = Place.create!(
    name: "II Liceum Ogólnokształcące im. Hugona Kołłątaja w Wałbrzychu",
    plan: {
        sectors: [
            {name: "Sala", rows: [
                {id: 1, seats: 20},
                {id: 2, seats: 20},
                {id: 3, seats: 20},
                {id: 4, seats: 20},
                {id: 5, seats: 20},
                {id: 6, seats: 20},
                {id: 7, seats: 20},
                {id: 8, seats: 20},
                {id: 9, seats: 20},
                {id: 10, seats: 20},
            ]}
        ]
    }
)

place2 = Place.create!(
    name: "Teatr Zdrojowy w Szczawnie Zdroju",
    plan: {
        sectors: [
            {name: "Sala", rows: [
                {id: 1, seats: 16},
                {id: 2, seats: 20},
                {id: 3, seats: 20},
                {id: 4, seats: 20},
                {id: 5, seats: 20},
                {id: 6, seats: 20},
                {id: 7, seats: 20},
                {id: 8, seats: 20},
                {id: 9, seats: 20},
                {id: 10, seats: 20},
                {id: 11, seats: 20},
                {id: 12, seats: 20},
                {id: 13, seats: 20},
                {id: 14, seats: 20},
            ]},
            {name: "Lewy balkon", rows: [
                {id: 1, seats: 6},
                {id: 2, seats: 6},
                {id: 3, seats: 6},
                {id: 4, seats: 6},
            ]},
            {name: "Prawy balkon", rows: [
                {id: 1, seats: 6},
                {id: 2, seats: 6},
                {id: 3, seats: 6},
                {id: 4, seats: 6},
            ]}]})

place3 = Place.create!(
    name: "Teatr Dramatyczny im. Jerzego Szaniawskiego w Wałbrzychu",
    plan: {
        sectors: [
            {name: "Sala", rows: [
                {id: 1, seats: 11},
                {id: 2, seats: 12},
                {id: 3, seats: 12},
                {id: 4, seats: 12},
                {id: 5, seats: 12},
                {id: 6, seats: 12},
                {id: 7, seats: 12},
                {id: 8, seats: 12},
                {id: 9, seats: 12},
                {id: 10, seats: 12},
                {id: 11, seats: 12},
                {id: 12, seats: 12},
                {id: 13, seats: 12},
                {id: 14, seats: 12},
                {id: 15, seats: 15},
            ]},
            {name: "Balkon", rows: [
                {id: 1, seats: 25},
                {id: 2, seats: 19},
            ]}
        ]
    })

concert = Concert.create(name: 'Mamma Mia', description: Faker::Lorem.paragraph_by_chars(number: 1200))
image = open('https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/14064161_889336681172605_6742123849404741008_n.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=5Gv5n5n5y7EAX9GZPLn&_nc_ht=scontent-frx5-1.xx&oh=f61662d419d53cbe1b84525076bb421a&oe=5E98FBAE');
concert.photos.attach(io: image, filename: 'test_image.jpg')

event1a = Event.create(starts_at: '2020-09-03', estimated_length: 9000, concert: concert, place: place1)
event1b = Event.create(starts_at: '2020-09-03', estimated_length: 9000, concert: concert, place: place2)

concert = Concert.create(name: 'Romeo i Julia', description: Faker::Lorem.paragraph_by_chars(number: 1200))
image = open('https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/14064161_889336681172605_6742123849404741008_n.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=5Gv5n5n5y7EAX9GZPLn&_nc_ht=scontent-frx5-1.xx&oh=f61662d419d53cbe1b84525076bb421a&oe=5E98FBAE');
concert.photos.attach(io: image, filename: 'test_image.jpg')

event2a = Event.create(starts_at: '2020-10-13', estimated_length: 7000, concert: concert, place: place1)
event2b = Event.create(starts_at: '2020-10-13', estimated_length: 7000, concert: concert, place: place2)
event2c = Event.create(starts_at: '2020-10-13', estimated_length: 7000, concert: concert, place: place3)

concert = Concert.create(name: 'Osiecka w II LO', description: Faker::Lorem.paragraph_by_chars(number: 1200))
image = open('https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/14064161_889336681172605_6742123849404741008_n.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=5Gv5n5n5y7EAX9GZPLn&_nc_ht=scontent-frx5-1.xx&oh=f61662d419d53cbe1b84525076bb421a&oe=5E98FBAE');
concert.photos.attach(io: image, filename: 'test_image.jpg')

event3a = Event.create(starts_at: '2021-03-03', estimated_length: 6000, concert: concert, place: place1)

concert = Concert.create(name: 'Metro', description: Faker::Lorem.paragraph_by_chars(number: 1200))
image = open('https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/14064161_889336681172605_6742123849404741008_n.jpg?_nc_cat=105&_nc_sid=dd9801&_nc_ohc=5Gv5n5n5y7EAX9GZPLn&_nc_ht=scontent-frx5-1.xx&oh=f61662d419d53cbe1b84525076bb421a&oe=5E98FBAE');
concert.photos.attach(io: image, filename: 'test_image.jpg')

event4a = Event.create(starts_at: '2021-06-03', estimated_length: 4500, concert: concert, place: place1)
event4b = Event.create(starts_at: '2021-06-03', estimated_length: 4500, concert: concert, place: place2)
event4c = Event.create(starts_at: '2021-06-03', estimated_length: 4500, concert: concert, place: place3)

Event.all.each do |event|
  event.place.plan.deep_symbolize_keys!

  event.place.plan[:sectors].each do |sector|
    sector[:rows].each do |row|
      row[:seats].times do |seat|
        Ticket.create!(event: event, sector: sector[:name], row: row[:id], seat: seat+1)
      end
    end
  end
end

FacebookApiService.new.call