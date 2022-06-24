class AddReferenceToFolders < ActiveRecord::Migration[7.0]
  def change
    add_reference :notes, :folder, foreign_key: true
  end
end
