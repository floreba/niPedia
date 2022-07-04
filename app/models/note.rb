class Note < ApplicationRecord
  belongs_to :user
  belongs_to :folder, optional: true

  # has_many :taggings, dependent: :destroy
  # tried it all functions work but dependent destroy generates a query with note.tagging_id

  # So seperated the taggings type
  has_many :taggings_as_tagger, class_name: "Tagging", foreign_key: 'tagger_id', dependent: :destroy
  has_many :taggings_as_reference, class_name: "Tagging", foreign_key: 'reference_id', dependent: :destroy

  include PgSearch::Model
    pg_search_scope :search_by_name_and_content,
      against: {name: 'A', content: 'B'},
      using: {tsearch:
        { prefix: true,
          any_word: true,
          dictionary: "english",
          highlight: {
            StartSel: '<b>',
            StopSel: '</b>',
            MaxWords: 123,
            MinWords: 456,
            ShortWord: 4,
            HighlightAll: true,
            MaxFragments: 3,
            FragmentDelimiter: '&hellip;'
          }
        }

      }
end
