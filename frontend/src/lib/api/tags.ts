import client from "lib/api/client"

const execTag = () => {
  return client.get("/tag")
}

export const handleExecTag = async () => {
  const res = await execTag()

  if (res.status === 200) {
    return res.data.tags
  }
}