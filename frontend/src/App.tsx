import React, { useLayoutEffect, useState } from "react"

import { handleExecRestaurant } from "lib/api/restaurants"
import { insertRestaurant } from "lib/api/insertRestaurant"
import { insertTag } from "lib/api/insertTag"

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any>([])
  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantUrl, setRestaurantUrl] = useState('')
  const [tagName, setTagName] = useState('')

  const handleChangeRestaurantName = (e: any) => {
    setRestaurantName(e.target.value)
  }

  const handleChangeRestaurantUrl = (e: any) => {
    setRestaurantUrl(e.target.value)
  }

  const handleChangeTagName = (e: any) => {
    setTagName(e.target.value)
  }

  const displayRestaurants = async() => {
    const restaurants = await handleExecRestaurant()
    setRestaurants(restaurants)
  }

  useLayoutEffect(() => {
    displayRestaurants();
  }, [])

  return (
    <>
      <ul>
        {restaurants.map((restaurant: any) =>
          <li key={restaurant['id']}>
            <div>
              <a href={restaurant['url']} target="_blank">{restaurant['name']}</a>
              {restaurant['tags'].map((tag: any) =>
                <p className="tag" key={tag.id}>{tag.name}</p>
              )}
            </div>
          </li>
        )}
      </ul>

      <div>レストランを追加する</div>
      <div>
        <label>レストラン名：<input value={restaurantName} onChange={handleChangeRestaurantName} /></label><br />
        <label>レストランのURL：<input value={restaurantUrl} onChange={handleChangeRestaurantUrl} /></label><br />
        <button onClick={() => {
            insertRestaurant(restaurantName, restaurantUrl);
            setRestaurantName("");
            setRestaurantUrl("");
            displayRestaurants();
          }}>作成</button>
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