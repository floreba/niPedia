class FoldersController < ApplicationController
  def index
    @folders = current_user.folders
    @folder = Folder.new
  end

  def show
    @folder = Folder.find(params[:id])
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
    @folder = Folder.find(params[:id])
    @folder.destroy
    redirect_to folders_path, status: :see_other
  end

  private

  def folder_params
    params.require(:folder).permit(:name)
  end
end
