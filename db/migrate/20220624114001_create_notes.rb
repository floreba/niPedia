class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.string :name
      t.text :content
      t.timestamp :timesnap

      t.timestamps
    end
  end
end
