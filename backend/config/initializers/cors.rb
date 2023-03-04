Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # originsはいくつでも設定できる ex: 'https://example.jp', 'http://localhost:3000'
    # "localhost:3000" # React側はポート番号3000で作るので「localhost:3000」を指定
    # TODO: vercelがデプロイごとにURLが変わるのでどのように対処するのか調べてドメイン設定したい
    origins "*"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end