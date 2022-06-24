class AddNotesReferenceToTaggings < ActiveRecord::Migration[7.0]
  def change
    add_reference :taggings, :reference, null: false, foreign_key: { to_table: :notes}
    add_reference :taggings, :tagger, null: false, foreign_key: { to_table: :notes }
  end
end
