Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :restaurant, only: %i[index create destroy]
      resources :tag, only: %i[index create destroy]
    end
  end
end
