import client from "lib/api/client"

export const execRestaurant = () => {
  return client.get("/restaurant")
}