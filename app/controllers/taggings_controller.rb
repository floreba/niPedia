class TaggingsController < ApplicationController
  def index
    @note = Note.find(params[:note_id])
    @taggings = current_user.taggings.where("reference_id =? OR tagger_id = '?', '#{@note.id}', '#{@note.id}")
    @taggings = policy_scope(Tagging)
  end

  def create
    @tagging = Tagging.new(tagging_params)
    @tagging.tagger = Note.find(params[:note_id])
    @tagging.reference = current_user.notes.where("name = ?, '#{@tagging.name}'")

    if @tagging.reference.empty? || @tagging.reference.nill?
      @reference_note = Note.new(name: @tagging.name)
      @reference_note.save!
      @tagging.reference = @reference_note.id
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
