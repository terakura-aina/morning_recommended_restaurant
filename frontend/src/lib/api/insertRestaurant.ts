import client from "lib/api/client"

export const insertRestaurant = (name: string, url: string) => {
  return client.post("/restaurant", {
    name,
    url
  })
}
