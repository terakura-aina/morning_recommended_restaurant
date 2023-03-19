import React, { useLayoutEffect, useState } from "react"

import { handleExecRestaurant } from "lib/api/restaurants"
import { insertRestaurant } from "lib/api/insertRestaurant"
import { destroyRestaurant } from "lib/api/destroyRestaurant"
import { insertTag } from "lib/api/insertTag"
import { IconContext } from 'react-icons'
import { TiDelete } from 'react-icons/ti';
import { MdAddCircle } from 'react-icons/md';

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
      <div className="restaurantList">
        <ul>
          {restaurants.map((restaurant: any) =>
            <li key={restaurant['id']}>
              <div>
                <a href={restaurant['url']} target="_blank" className="restaurantList__name">{restaurant['name']}</a>
                {restaurant['tags'].map((tag: any) =>
                  <span className="restaurantList__tag" key={tag.id}>{tag.name}</span>
                )}
                <button className="restaurantList__delete" onClick={ async () => {
                  console.log(restaurant['id'])
                  await destroyRestaurant(restaurant['id']);
                  displayRestaurants();
                }}>
                  <IconContext.Provider value={{ color: '#ccc', size: '30px' }}>
                    <TiDelete />
                  </IconContext.Provider>
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="addRestaurant">
        <div>レストランを追加する</div>
        <label>レストラン名：<input value={restaurantName} onChange={handleChangeRestaurantName} /></label><br />
        <label>レストランのURL：<input value={restaurantUrl} onChange={handleChangeRestaurantUrl} /></label><br />
        <button className="addRestaurant__addButton" onClick={ async () => {
            await insertRestaurant(restaurantName, restaurantUrl);
            setRestaurantName("");
            setRestaurantUrl("");
            displayRestaurants();
          }}>
            <IconContext.Provider value={{ color: '#71d355', size: '30px' }}>
              <MdAddCircle />
            </IconContext.Provider>
            <span className="addRestaurant__addButtonText"> 追加する</span>
            </button>
      </div>

      {/* <div>タグを追加する</div>
      <div>
        <input value={tagName} onChange={handleChangeTagName} /><br />
        <button onClick={() => insertTag(tagName)}>作成</button>
      </div> */}
    </>
  )
}

export default App