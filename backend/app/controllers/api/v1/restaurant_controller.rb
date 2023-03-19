class Api::V1::RestaurantController < ApplicationController
  def index
    result = Graphql::Client.query(IssueInfoQuery)

    render json: {restaurants: result.to_h['data']['restaurants']}
  end

  def create
    Restaurant.create(name: params[:name], url: params[:url], description: params[:description], open: params[:open])
  end

  def destroy
    Restaurant.find(params[:id]).destroy!
  end

  private

  IssueInfoQuery = Graphql::Client.parse <<~'GRAPHQL'
    query {
      restaurants {
        id
        name
        url
        description
        open
        tags {
          id
          name
        }
      }
    }
  GRAPHQL
end
