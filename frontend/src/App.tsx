import React, { useLayoutEffect, useState } from "react"

import { execRestaurant } from "lib/api/restaurants"
import { insertRestaurant } from "lib/api/insertRestaurant"
import { insertTag } from "lib/api/insertTag"

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any>([])
  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantUrl, setRestaurantUrl] = useState('')
  const [tagName, setTagName] = useState('')

  const handleExecRestaurant = async () => {
    const res = await execRestaurant()

    console.log(res.status)
    if (res.status === 200) {
      console.log(res.data.restaurants)
      console.log(restaurants)
      setRestaurants(res.data.restaurants)
      console.log(restaurants)
    }
  }

  const handleChangeRestaurantName = (e: any) => {
    setRestaurantName(e.target.value)
  }

  const handleChangeRestaurantUrl = (e: any) => {
    setRestaurantUrl(e.target.value)
  }

  const handleChangeTagName = (e: any) => {
    setTagName(e.target.value)
  }

  useLayoutEffect(() => {
    handleExecRestaurant()
  }, [])

  return (
    <>
      <ul>
        {restaurants.map((restaurant: any) =>
          <li key={restaurant['id']}>
            <div>{restaurant['name']}
              {restaurant['tags'].map((tag: any) =>
                <p className="tag" key={tag.id}>{tag.name}</p>
              )}
            </div>
          </li>
        )}
      </ul>

      <div>レストランを追加する</div>
      <div>
        <input value={restaurantName} onChange={handleChangeRestaurantName} /><br />
        <input value={restaurantUrl} onChange={handleChangeRestaurantUrl} /><br />
        <button onClick={() => insertRestaurant(restaurantName, restaurantUrl)}>作成</button>
      </div>

      <div>タグを追加する</div>
      <div>
        <input value={tagName} onChange={handleChangeTagName} /><br />
        <button onClick={() => insertTag(tagName)}>作成</button>
      </div>
    </>
  )
}

export default App