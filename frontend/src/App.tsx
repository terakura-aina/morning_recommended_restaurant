import React, { useEffect, useLayoutEffect, useState } from "react"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import Select from "react-select";

import { handleExecRestaurant } from "lib/api/restaurants"
import { handleExecTag } from "lib/api/tags";
import { insertRestaurant } from "lib/api/insertRestaurant"
import { destroyRestaurant } from "lib/api/destroyRestaurant"
import { insertTag } from "lib/api/insertTag"
import { hasDescriptionOrOpen } from "lib/api/hasDescriptionOrOpen";
import { openInfo } from "lib/api/openInfo";
import { setOptions } from "lib/api/setOptions";
import { IconContext } from 'react-icons'
import { TiDelete } from 'react-icons/ti';
import { MdAddCircle } from 'react-icons/md';
import lemon from 'images/lemon.png';
import doughnut from 'images/doughnut.png'

const App: React.FC = () => {

  const options: Array<object> = []

  const [restaurants, setRestaurants] = useState<any>([])
  const [tags, setTags] = useState<any>([])
  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantUrl, setRestaurantUrl] = useState('')
  const [restaurantDescription, setRestaurantDescription] = useState('')
  const [restaurantOpen, setRestaurantOpen] = useState('')
  const [tagName, setTagName] = useState('')
  const [selectedValue, setSelectedValue] = useState(options[0]);

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

  const resetAddTagForm = () => {
    displayTags()
    setTagName("")
  }

  const displayRestaurants = async() => {
    const restaurants = await handleExecRestaurant()
    setRestaurants(restaurants)
  }

  const displayTags = async() => {
    const tags = await handleExecTag()
    setTags(tags)
  }

  useLayoutEffect(() => {
    displayRestaurants();
    displayTags();
  }, [])

  useEffect(() => {
    setOptions(tags, options);
  })

  return (
    <>
      <div className="addForm">
        <div className="addRestaurant">
          <div className="addRestaurant__countainer">
            <div className="addRestaurant__title">レストランを追加する</div>
            <label>
              <span className="addRestaurant__name">レストラン名：</span><br />
              <input value={restaurantName} onChange={handleChangeRestaurantName} className="addRestaurant__nameInput" />
            </label><br />
            <label>
              <span className="addRestaurant__url">レストランのURL：</span><br />
              <input value={restaurantUrl} onChange={handleChangeRestaurantUrl} className="addRestaurant__urlInput" />
            </label><br />
            <label>
              <span className="addRestaurant__description">備考：</span><br />
              <input value={restaurantDescription} onChange={handleChangeRestaurantDescription}  className="addRestaurant__descriptionInput"/>
              </label><br />
            <label>
              <span className="addRestaurant__open">Openする時間：</span><br />
              <input value={restaurantOpen} onChange={handleChangeRestaurantOpen} className="addRestaurant__openInput" />
            </label><br />
            <div className="addRestaurant__tag">
              <span className="addRestaurant__tagName">タグ：</span><br />
              <span className="addRestaurant__tagNameInput">
                <Select
                  isMulti
                  options={options}
                  onChange={(value: any) => {
                    return value ? setSelectedValue([...value]) : null;
                  }}
                />
              </span>
            </div>
            <button className="addRestaurant__addButton" onClick={ async () => {
              await insertRestaurant(restaurantName, restaurantUrl, restaurantDescription, restaurantOpen, selectedValue);
              resetAddRestrantForm();
              displayRestaurants();
            }}>
              <IconContext.Provider value={{ color: '#82b046', size: '30px' }}>
                <MdAddCircle />
              </IconContext.Provider>
              <span className="addRestaurant__addButtonText"> 追加する</span>
            </button>
          </div>
        </div>

        <div className="addTag">
          <div className="addTag__countainer">
            <div className="addTag__title">タグを追加する</div>
            <label>
              <span className="addTag__name">タグの名前：</span><br />
              <input value={tagName} onChange={handleChangeTagName} className="addTag__openInput" />
            </label><br />
            <button className="addTag__addButton" onClick={() => {
              insertTag(tagName);
              resetAddTagForm();
              }}>
              <IconContext.Provider value={{ color: '#82b046', size: '30px' }}>
                <MdAddCircle />
              </IconContext.Provider>
              <span className="addTag__addButtonText"> 追加する</span>
            </button>
          </div>
        </div>
      </div>

      <div className="restaurantList">
        <ul>
          {restaurants.map((restaurant: any) =>
            <li key={restaurant['id']}>
              <div>
                <a href={restaurant['url']} target="_blank" className="restaurantList__name"
                  data-tooltip-id={restaurant['id']} data-tooltip-place="bottom"
                  data-tooltip-html={hasDescriptionOrOpen(restaurant['description'], restaurant['open']) && `open ${openInfo(restaurant['open'])}<br />${restaurant['description'] ?? ""}`}
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
      <div>
        <img className="imageLemon" src={lemon} />
        <img className="imageDoughnut" src={doughnut} />
      </div>
    </>
  )
}

export default App