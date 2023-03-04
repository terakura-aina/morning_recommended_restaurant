import client from "lib/api/client"

export const insertTag = (name: string) => {
  return client.post("/tag", {
    name
  })
}