import React, { useLayoutEffect, useState } from "react"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

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
  const [restaurantDescription, setRestaurantDescription] = useState('')
  const [restaurantOpen, setRestaurantOpen] = useState('')
  const [tagName, setTagName] = useState('')

  const handleChangeRestaurantName = (e: any) => {
    setRestaurantName(e.target.value)
  }

  const handleChangeRestaurantUrl = (e: any) => {
    setRestaurantUrl(e.target.value)
  }

  const handleChangeRestaurantDescription = (e: any) => {
    setRestaurantDescription(e.target.value)
  }

  const handleChangeRestaurantOpen = (e: any) => {
    setRestaurantOpen(e.target.value)
  }

  const handleChangeTagName = (e: any) => {
    setTagName(e.target.value)
  }

  const resetAddRestrantForm = () => {
    setRestaurantName("");
    setRestaurantUrl("");
    setRestaurantDescription("");
    setRestaurantOpen("");
  }

  const displayRestaurants = async() => {
    const restaurants = await handleExecRestaurant()
    setRestaurants(restaurants)
  }

  const hasDescriptionOrOpen = (description: string | undefined, open: string | undefined) => {
    return description || open
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
                <a href={restaurant['url']} target="_blank" className="restaurantList__name"
                  data-tooltip-id={restaurant['id']} data-tooltip-place="bottom"
                  data-tooltip-html={hasDescriptionOrOpen(restaurant['description'], restaurant['open']) && `open ${restaurant['open'] ?? ""}<br />${restaurant['description'] ?? ""}`}
                >
                  {restaurant['name']}
                  <Tooltip id={restaurant['id']} place="right" />
                </a>
                {restaurant['tags'].map((tag: any) =>
                  <span className="restaurantList__tag" key={tag.id}>{tag.name}</span>
                )}
                <button className="restaurantList__delete" onClick={ async () => {
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
        <label>備考：<input value={restaurantDescription} onChange={handleChangeRestaurantDescription} /></label><br />
        <label>Openする時間：<input value={restaurantOpen} onChange={handleChangeRestaurantOpen} /></label><br />
        <button className="addRestaurant__addButton" onClick={ async () => {
          await insertRestaurant(restaurantName, restaurantUrl, restaurantDescription, restaurantOpen);
          resetAddRestrantForm();
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