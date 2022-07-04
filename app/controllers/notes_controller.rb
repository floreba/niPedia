class NotesController < ApplicationController
  before_action :set_note, only: %i[edit update destroy]

  def index
    # @notes = current_user.notes
    @note = Note.new
    @notes = policy_scope(Note)
  end

  def create_or_find_last_note
    if current_user.notes.empty?
      @note = Note.create(name: 'Your first note', content:
        "Exciting, isn't it? You can link your note with other notes. To do so, you simply
        create a tagging that has the name of the referenced note.
        If there's no note named like that, it will automatically create one.")
      @note.user = current_user
    elsif
      @note = current_user.notes.order("updated_at ASC").last
    end
    authorize @note
    redirect_to edit_note_path(@note), notice: 'Welcome (back) to your last updated note.'
  end

  def new
    @note = Note.new
    @folder = Folder.find(params[:folder_id])
    authorize @note
    authorize @folder
  end

  def edit
    authorize @note
    get_taggings
    @tagging = Tagging.new
  end

  def create
    @note = Note.new(note_params)
    @note.user = current_user
    if params[:folder_id]
      set_folder
      @note.folder = @folder
      authorize @folder
    end
    authorize @note
    if @note.save!
      redirect_to edit_note_path(@note), notice: 'Note was successfully created.'
    else
      render :index, status: :unprocessable_entity
    end
  end

  def update
    authorize @note
    respond_to do |format|
      if @note.update(note_params)
        format.html { redirect_to note_path(@note) }
        format.json { render json: @note }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json
      end
    end
    # if @note.update(note_params)
    #   redirect_to edit_note_path(@note)
    # else
    #   render :update
    # end
  end

  def destroy
    authorize @note
    @note.destroy
    redirect_to notes_path, status: :see_other
  end

  private

  def set_note
    @note = Note.find(params[:id])
  end

  def set_folder
    @folder = Folder.find(params[:folder_id])
  end

  def note_params
    params.require(:note).permit(:name, :content)
  end

  def get_taggings
    @taggers = @note.taggings_as_tagger
    @references = @note.taggings_as_reference
  end

  def tagging_params
    params.require(:tagging).permit(:name, :tagger_id)
  end

end
