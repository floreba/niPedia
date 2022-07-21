class Note < ApplicationRecord
  belongs_to :user
  belongs_to :folder, optional: true

  # has_many :taggings, dependent: :destroy
  # tried it all functions work but dependent destroy generates a query with note.tagging_id

  # So seperated the taggings type
  has_many :taggings_as_tagger, class_name: "Tagging", foreign_key: 'tagger_id', dependent: :destroy
  has_many :taggings_as_reference, class_name: "Tagging", foreign_key: 'reference_id', dependent: :destroy

  validates :name, presence: true, uniqueness: { case_sensitive: false, message: "%{value} note already exists"  }, length: {maximum: 20}


  include PgSearch::Model
    pg_search_scope :search_by_name_and_content,
      against: {name: 'A', content: 'B'},
      using: {tsearch:
        { prefix: true,
          any_word: true,
          dictionary: "english",
          highlight: {
            StartSel: "<mark>",
            StopSel: "</mark>",
            MaxWords: 100,
            MinWords: 1,
            ShortWord: 4,
            HighlightAll: false,
            MaxFragments: 3,
            FragmentDelimiter: '&hellip;'

          }
        }

      }
end
