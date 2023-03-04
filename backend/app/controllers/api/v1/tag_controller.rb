class Api::V1::TagController < ApplicationController
  def index
    result = Graphql::Client.query(IssueInfoQuery)

    render json: {tags: result.to_h['data']['tags']}
  end

  def create
    Tag.create(name: params[:name])
  end

  private

  IssueInfoQuery = Graphql::Client.parse <<~'GRAPHQL'
    query {
      tags {
        name
      }
    }
  GRAPHQL
end