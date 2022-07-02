class TaggingPolicy < ApplicationPolicy

  def destroy?
    user
  end

  def create?
    record.reference.user == user && record.tagger.user == user
  end

  # def create_tagging?
  #   record.reference.user == user && record.tagger.user == user
  # end

  class Scope < Scope
    def resolve
      scope.all
    end
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end
end
