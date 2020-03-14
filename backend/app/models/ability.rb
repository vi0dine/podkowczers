# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    if user.admin?
      can :manage, :all
    else
      can :read, Event
      can :read, Concert
      can :read, Ticket, reserved: false
      can :reserve, Ticket, reserved: false
      can :return, Ticket, user_id: user.id
    end
  end
end
