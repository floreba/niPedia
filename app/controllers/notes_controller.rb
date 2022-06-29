class NotesController < ApplicationController
  before_action :set_note, only: %i[edit update destroy]

  def index
    @notes = current_user.notes
    @note = Note.new
  end

  def create_or_find_last_note
    if current_user.notes.empty?
      @note = Note.create(name: "new note", content: "content")
    elsif
      @note = current_user.notes.order("updated_at ASC").last
    end
  end

  def new
    @note = Note.new
  end
#
  def edit
  end

  def create
    @note = Note.new(note_params)
    @note.user = current_user
    if note_folder_params[:folder_id]
      @note.folder = Folder.find(note_folder_params[:folder_id])
    end
    if @note.save!
      redirect_to edit_note_path(@note), notice: 'Note was successfully created.'
    else
      render :index, status: :unprocessable_entity
    end
  end

  def update
    if @note.update(note_params)
      redirect_to edit_note_path(@note)
    else
      render :update
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    redirect_to notes_path, status: :see_other
  end

  private

  def set_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.require(:note).permit(:name, :content)
  end

  def note_folder_params
    params.require(:note).permit(:folder_id)
  end
end
