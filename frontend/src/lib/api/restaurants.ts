import client from "lib/api/client"

const execRestaurant = () => {
  return client.get("/restaurant")
}

export const handleExecRestaurant = async () => {
  const res = await execRestaurant()

  if (res.status === 200) {
    res.data.restaurants.sort((a: any, b: any) => a["id"] - b["id"])
    return res.data.restaurants
  }
}