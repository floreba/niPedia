class NotesController < ApplicationController
  before_action :set_note, only: %i[edit update destroy]

  def index
    @notes = current_user.notes
    @note = Note.new
    @notes = policy_scope(Note)
  end

  def create_or_find_last_note
    if current_user.notes.empty?
      @note = Note.create(name: "new note", content: "content")
    elsif
      @note = current_user.notes.order("updated_at ASC").last
    end
    authorize @note
  end

  def edit
    authorize @note
  end

  def create
    @note = Note.new(note_params)
    @note.user = current_user
    authorize @note
    if @note.save!
      redirect_to root_path, notice: 'Note was successfully created.'
    else
      render :index, status: :unprocessable_entity
    end
  end

  def update
    authorize @note
    if @note.update(note_params)
      redirect_to edit_note_path(@note)
    else
      render :update
    end
  end

  def destroy
    authorize @note
    @note.destroy
    redirect_to root_path, status: :see_other
  end

  private

  def set_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.require(:note).permit(:name, :content)
  end
end
