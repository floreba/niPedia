class TaggingsController < ApplicationController
  def index
    @taggings = current_user.taggings
  end

  def create
    @tagging = Tagging.new(tagging_params)
  end

  def destroy
    
  end

  private
  def tagging_params
    params.require(:tagging).permit(:name)
  end
end
