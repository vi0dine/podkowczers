class AppStatisticsService
  def initialize
    @users = User.all
    @concerts = Concert.all
    @events = Event.all
    @tickets = Ticket.all
    @posts = Post.all
  end

  def call

  end
end