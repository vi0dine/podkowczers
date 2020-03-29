class EventCreatorService
  def initialize(params)
    @concert = Concert.find(params[:event][:concert_id])
    @place = Place.find(params[:event][:place])
    @starts_at = params[:event][:starts_at]
    @estimated_length = params[:event][:estimated_length]
    @reserved = params[:event][:reserved_seats]
    @opening_date = params[:event][:planned]
  end

  def call
    @event = Event.create!({
                               concert: @concert,
                               place: @place,
                               starts_at: @starts_at,
                               estimated_length: @estimated_length
                           })

    @event.place.plan.deep_symbolize_keys!

    @event.place.plan[:sectors].each do |sector|
      sector[:rows].each do |row|
        row[:seats].times do |seat|
          Ticket.create!(event: @event, sector: sector[:name], row: row[:id], seat: seat+1)
        end
      end
    end

    @reserved&.each do |s|
      @event.tickets.where(sector: s[:sector], row: s[:row], seat: s[:seat]).take.update(reserved: true)
    end

    if @opening_date
      OpenReservationForEventJob.set(wait_until: DateTime.parse(@opening_date)).perform_later(@event.id)
    else
      @event.reservation_open = true
      @event.reservation_opened_at = DateTime.now
    end

    @event
  end
end