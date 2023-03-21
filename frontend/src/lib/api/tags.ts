import client from "lib/api/client"

const execTag = () => {
  return client.get("/tag")
}

export const handleExecTag = async () => {
  const res = await execTag()
  console.log(res)

  if (res.status === 200) {
    return res.data.tags
  }
}