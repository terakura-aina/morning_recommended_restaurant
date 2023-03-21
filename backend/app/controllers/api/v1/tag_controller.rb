class Api::V1::TagController < ApplicationController
  def index
    result = Graphql::Client.query(IssueInfoQuery)

    render json: {tags: result.to_h['data']['tags']}
  end

  def create
    Tag.create(name: params[:name])
  end

  def destroy
    Tag.find(params[:id]).destroy!
  end

  private

  IssueInfoQuery = Graphql::Client.parse <<~'GRAPHQL'
    query {
      tags {
        id
        name
      }
    }
  GRAPHQL
end