class OpenReservationForEventJob < ApplicationJob
  queue_as :open_reservation

  def perform(event_id)
    event = Event.find(event_id)
    event.update(reservation_open: true, reservation_opened_at: DateTime.now)

    client = Exponent::Push::Client.new

    messages = []

    User.all.where.not(notifications_token: nil).each do |user|
      messages << {
          to: user.notifications_token,
          sound: "default",
          body: "Właśnie otworzyliśmy rezerwację miejsc na koncert #{event.concert.name} w #{event.place}!"
      }
    end

    client.publish messages
  end
end