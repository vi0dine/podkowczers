class EventCreatorService
  def initialize(params)
    @concert = Concert.find(params[:event][:concert_id])
    @place = params[:event][:place][:name]
    @starts_at = params[:event][:starts_at]
    @estimated_length = params[:event][:estimated_length]
    @rows = params[:event][:place][:rows].to_i
    @seats = params[:event][:place][:seats].to_i
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

    (1..@rows).each do |i|
      (1..@seats).each do |j|
        Ticket.create!({
                           event: @event,
                           sector: 'A',
                           row: i,
                           seat: j,
                           reserved: false,
                           mailed: false
                       })
      end
    end

    @reserved&.each do |s|
      @event.tickets.where(row: s[:row], seat: s[:seat]).take.update(reserved: true)
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