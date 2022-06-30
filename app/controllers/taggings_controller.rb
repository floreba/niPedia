class TaggingsController < ApplicationController
  def index
    @taggings = policy_scope(Tagging.all)
  end

  def new
    @tagging = Tagging.new
    # @note = Note.find(params[:id])
    # raise
  end

  def create
    raise
    @tagging = Tagging.new(tagging_params)
    @tagging.tagger_id = Note.find(params[:id])
    @tagging.reference_id = policy_scope(Note).find_by('name = ?', @tagging.name)

    if @tagging.reference_id.empty? || @tagging.reference.nill?
      @reference_note = Note.new(name: @tagging.name)
      @reference_note.save!
      @tagging.reference_id = @reference_note.id
    end
    if @tagging.save!
      redirect_to edit_note_path(@tagging.tagger_id), notice: 'Tagging was successfully created.'
    else
      render :index, status: :unprocessable_entity
    end


  end

  def destroy
    @tagging = Tagging.find(params[:id])
    authorize @tagging
    path = @tagging.tagger_id
    @tagging.destroy
    redirect_to edit_note_path(path), status: :see_other
    # toilet_path(toilet), status: :see_other
  end

  private

  def tagging_params
    params.require(:tagging).permit(:name)
  end
end
