class NotePolicy < ApplicationPolicy

  def create_or_find_last_note?
    user
  end

  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      user.admin? ? scope.all : scope.where(user: user)
    end
  end


end
