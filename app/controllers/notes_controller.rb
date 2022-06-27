class NotesController < ApplicationController
  def index
    @notes = current_user.notes
    @note = Note.new
  end

  def edit
    if current_user.notes.empty?
      @note = Note.create(name: "new note", content: "content")
    elsif
      @note = current_user.notes[0]
    end
  end

  def create
    @note = Note.new(note_params)
    @note.user = current_user
    if @note.save!
      redirect_to root_path, notice: 'Note was successfully created.'
    else
      render :index, status: :unprocessable_entity
    end
  end

  def update
    @note = Note.find(params[:id])
    if @note.update(note_params)
      redirect_to edit_note_path(@note)
    else
      render :update
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    redirect_to root_path, status: :see_other
  end

  private

  def note_params
    params.require(:note).permit(:name, :content)
  end
end
