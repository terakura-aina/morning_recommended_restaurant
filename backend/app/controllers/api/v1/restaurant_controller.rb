class Api::V1::RestaurantController < ApplicationController
  def index
    result = Graphql::Client.query(IssueInfoQuery)

    render json: {restaurants: result.to_h['data']['restaurants']}
  end

  def create
    restaurant = Restaurant.create(name: params[:name], url: params[:url], description: params[:description], open: params[:open])
    unless params[:tag].blank?
      params[:tag].each do |tag|
        tag = Tag.find_by(name: tag['value'])
        RestaurantTag.create(restaurant_id: restaurant.id, tag_id: tag.id)
      end
    end
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
