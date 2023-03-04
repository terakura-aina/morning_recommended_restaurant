class Api::V1::RestaurantController < ApplicationController
  def index
    result = Graphql::Client.query(IssueInfoQuery)

    render json: {restaurants: result.to_h['data']['restaurants']}
  end

  def create
    Restaurant.create(name: params[:name], url: params[:url])
  end

  private

  IssueInfoQuery = Graphql::Client.parse <<~'GRAPHQL'
    query {
      restaurants {
        id
        name
        url
        tags {
          id
          name
        }
      }
    }
  GRAPHQL
end
