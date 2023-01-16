import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setLocation } from '../../../../store/filterSlice'
import { setCurrentPage } from '../../../../store/gallerySlice'
import ClearSVG from '../../SVG/ClearSVG/ClearSVG'
import SelectSVG from '../../SVG/SelectSVG/SelectSVG'


const LocationSelect = ({locationsShow, setLocationsShow, locations, locationId}) => {
    const dispatch = useDispatch()

    let location = locationId === 0 ? 'Location' : locations.find(i => i.id === locationId).location
    
    const locRef = useRef()
    if(locRef.current) { // укарачиваем длинную строку в активной локации
        const locRefWith = Math.round(locRef.current.offsetWidth / 10)
        if(location.length > locRefWith) location = location.slice(0,locRefWith) + '...'
    }

    let locationList = null
    if(locRef.current) { // укарачиваем длинную строку в списке локаций
        const locRefWith = Math.round(locRef.current.offsetWidth / 7)
        locationList = locations.map(item => {
            if(item.location.length > locRefWith) {
                const newItem = {...item}
                newItem.location = item.location.slice(0,locRefWith) + '...'
                return newItem
            } else {
                return item
            }
        })
    }

    const changeLocation = (id) => { // выбрать локацию
        if(locationId !== id) {
            dispatch(setLocation(id))
            dispatch(setCurrentPage(1))
            setLocationsShow(false)
        } else {
            setLocationsShow(false)
        }
    }

    return  <div className={locationsShow ? 'select active' : 'select'}>
                <div ref={locRef} onClick={() => setLocationsShow(!locationsShow)} className='option'>{ location }</div>

                {locationId !== 0 && <div onClick={() => changeLocation(0)} className='select__cleare'><ClearSVG /></div>}
                
                <div onClick={() => setLocationsShow(!locationsShow)} className='select__arrow'><SelectSVG /></div>

                <div className={locationsShow ? 'more show' : 'more'}>
                    { locationList && locationList.map(item => <div className='option' onClick={() => changeLocation(item.id)} key={item.id}>{item.location}</div>) }
                </div>
            </div>
}

export default React.memo(LocationSelect)