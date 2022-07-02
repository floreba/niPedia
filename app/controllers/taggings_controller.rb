class TaggingsController < ApplicationController
  def index
    @taggings = policy_scope(Tagging.all)
  end

  def destroy
    @tagging = Tagging.find(params[:id])
    authorize @tagging
    path = @tagging.tagger_id
    @tagging.destroy
    redirect_to edit_note_path(path), status: :see_other
    # toilet_path(toilet), status: :see_other
  end

  def create
    @tagging = Tagging.new(tagging_params)

    @tagging.reference = Note.find_by('name = ?', @tagging.name)
    if @tagging.reference_id.nil?
      # declare a note + current user & save
      @reference_note = Note.new(name: @tagging.name)
      @reference_note.user = current_user
      @reference_note.save
      @tagging.reference = @reference_note
    end
    authorize @tagging
    if @tagging.save!
      redirect_to edit_note_path(@tagging.tagger_id), notice: 'Tagging was successfully created.'
    else
      render :index, status: :unprocessable_entity
    end
  end

  private

  def tagging_params
    params.require(:tagging).permit(:name, :tagger_id)
  end
end
