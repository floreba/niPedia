class FoldersController < ApplicationController
  before_action :set_folder, only: %i[show destroy]

  def index
    @folders = current_user.folders
    @folder = Folder.new
  end

  def show
  end

  def create
    @folder = Folder.new(folder_params)
    @folder.user = current_user
    if @folder.save!
      redirect_to folders_path, notice: 'Folder was successfully created.'
    else
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    @folder.destroy
    redirect_to folders_path, status: :see_other
  end

  private

  def set_folder
    @folder = Folder.find(params[:id])
  end

  def folder_params
    params.require(:folder).permit(:name)
  end
end
