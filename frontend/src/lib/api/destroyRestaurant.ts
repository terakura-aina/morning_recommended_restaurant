import client from "lib/api/client"

export const destroyRestaurant = (restaurantId: number) => {
  if (!window.confirm("本当に削除しますか?")) {
    return
  }
  return client.delete(`/restaurant/${restaurantId}`)
}