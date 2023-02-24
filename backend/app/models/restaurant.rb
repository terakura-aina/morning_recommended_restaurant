class Restaurant < ApplicationRecord
  has_many :restaurant_tags, dependent: :destroy
  has_many :tags, through: :restaurant_tags
  #restaurantの保存とともにrestaurant_tagsも同時に更新できるようにする
  accepts_nested_attributes_for :restaurant_tags

  validates :name, presence: true
  validates :url, presence: true
end
