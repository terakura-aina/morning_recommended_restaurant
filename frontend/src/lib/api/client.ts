import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true 
}

const client = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:8080/api/v1"
}), options)

export default client