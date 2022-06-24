class Tagging < ApplicationRecord
  belongs_to :reference, class_name: 'Note'
  belongs_to :tagger, class_name: 'Note'
end
