module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    field :restaurants, [Types::RestaurantType], null: false
    field :tags, [Types::TagType], null: false
    def test_field
      "Test"
    end

    def restaurants
      Restaurant.all
    end

    def tags
      Tag.all
    end
  end
end
