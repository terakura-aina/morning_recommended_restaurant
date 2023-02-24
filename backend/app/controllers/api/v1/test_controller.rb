class Api::V1::TestController < ApplicationController
  def index
    result = Graphql::Client.query(IssueInfoQuery)

    render json: {message: result.to_h['data']['testField']}
  end

  private

  IssueInfoQuery = Graphql::Client.parse <<~'GRAPHQL'
    query {
      testField
    }
  GRAPHQL
end
