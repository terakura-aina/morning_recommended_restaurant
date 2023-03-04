import React, { useLayoutEffect, useState } from "react"

import { execRestaurant } from "lib/api/restaurants"

const App: React.FC = () => {
  type Restaurants = {
    name: String
  }
  const [restaurants, setRestaurants] = useState<any>([])

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
    </>
  )
}

export default App