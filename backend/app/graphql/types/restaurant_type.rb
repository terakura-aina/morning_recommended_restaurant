module Types
  class RestaurantType < Types::BaseObject
    field :id, String, null: false
    field :name, String, null: false
    field :url, String, null: false
    field :description, String
    field :open, String
    field :tags, [Types::TagType], null: false
  end
end
