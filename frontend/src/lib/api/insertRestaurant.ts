import client from "lib/api/client"

export const insertRestaurant = (name: string, url: string, description: string, open: string) => {
  return client.post("/restaurant", {
    name,
    url,
    description,
    open
  })
}
