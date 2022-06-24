class Note < ApplicationRecord
  belongs_to :user
  belongs_to :folder
  has_many :taggings
end
