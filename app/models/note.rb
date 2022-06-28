class Note < ApplicationRecord
  belongs_to :user
  belongs_to :folder, optional: true

  # has_many :taggings, dependent: :destroy
  # tried it all functions work but dependent destroy generates a query with note.tagging_id

  # So seperated the taggings type
  has_many :taggings_as_tagger, class_name: "Tagging", foreign_key: 'tagger_id', dependent: :destroy
  has_many :taggings_as_reference, class_name: "Tagging", foreign_key: 'reference_id', dependent: :destroy
end
