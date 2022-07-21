class TaggingsController < ApplicationController
  def index
    @taggings = policy_scope(Tagging.all)
    nodes = policy_scope(Note.all)
    edges = @taggings.map{ |tag| {from: tag.tagger.id, to: tag.reference.id} }
    @data = {nodes: nodes, edges: edges}
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @data }
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

  def create
    @tagging = Tagging.new(tagging_params)

    @tagging.reference = Note.find_by('name ILIKE ? AND user_id = ?', @tagging.name, current_user.id)
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
