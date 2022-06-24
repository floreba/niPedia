class Note < ApplicationRecord
  belongs_to :user
  belongs_to :folder, optional: true
  has_many :taggings
end
