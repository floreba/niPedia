class TaggingsController < ApplicationController
  def index
    @taggings = policy_scope(Tagging.all)
  end

  def create
    @tagging = Tagging.new(tagging_params)
    @tagging.tagger_id = Note.find(params[:note_id])
    @tagging.reference_id = policy_scope(Note).find_by('name = ?', @tagging.name)

    if @tagging.reference_id.empty? || @tagging.reference.nill?
      @reference_note = Note.new(name: @tagging.name)
      @reference_note.save!
      @tagging.reference_id = @reference_note.id
    end
  end

  def destroy
    @tagging = Tagging.find(params[:tagging_id])
    @tagging.destroy
    redirect_to notes_edit_path, status: :see_other
  end

  private

  def tagging_params
    params.require(:tagging).permit(:name)
  end
end
