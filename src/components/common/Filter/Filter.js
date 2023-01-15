import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import { setAuthor, setCreatedBeforeValue, setCreatedFromValue, setLocation, setNameQuery } from '../../../redux/filterSlice'
import { setCurrentPage } from '../../../redux/gallerySlice'


const Filter = ({ authors, locations, authorId, locationId, status }) => {
    const dispatch = useDispatch()
    const [nameValue, setNameValue] = useState('') // фильтр по названию
    const [authorsShow, setAuthorsShow] = useState(false) // показать список авторов
    const [locationsShow, setLocationsShow] = useState(false) // показать список локаций
    const [createdShow, setCreatedShow] = useState(false) // показать ввод даты
    const [createdFrom, setCreatedFrom] = useState('') // фильтр по дате от 
    const [createdBefore, setCreatedBefore] = useState('') // фильтр по дате до

    let author = authorId === 0 ? 'Author' : authors.find(i => i.id === authorId).name
    const authorRef = useRef()
    if(authorRef.current) { // укарачиваем длинную строку
        const authorRefWith = Math.round(authorRef.current.offsetWidth / 10)
        if(author.length > authorRefWith) author = author.slice(0,authorRefWith) + '...'
    }

    let authorList = null
    if(authorRef.current) { // укарачиваем длинную строку
        const authorRefWith = Math.round(authorRef.current.offsetWidth / 7)
        authorList = authors.map(item => {
            if(item.name.length > authorRefWith) {
                const newItem = {...item}
                newItem.name = item.name.slice(0, authorRefWith) + '...'
                return newItem
            } else {
                return item
            }
        })
    }

    let location = locationId === 0 ? 'Location' : locations.find(i => i.id === locationId).location
    const locRef = useRef()
    if(locRef.current) { // укарачиваем длинную строку
        const locRefWith = Math.round(locRef.current.offsetWidth / 10)
        if(location.length > locRefWith) location = location.slice(0,locRefWith) + '...'
    }

    let locationList = null
    if(locRef.current) { // укарачиваем длинную строку
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

    const nameSearchDebounce = useMemo(() => debounce((name) => { // отложенный поиск по названию
        dispatch(setNameQuery(name))
        dispatch(setCurrentPage(1))
    }, 3000),[dispatch])

    const nameChange = useCallback((e) => { // ввод названия
        setNameValue(e.target.value)
        nameSearchDebounce(e.target.value)
    }, [nameSearchDebounce])

    const nameValueCleare = () => { // очистить поле названия
        setNameValue('')
        dispatch(setNameQuery(''))
    }

    const changeAuthor = (id) => { // выбрать автора
        if(authorId !== id) {
            dispatch(setAuthor(id))
            dispatch(setCurrentPage(1))
            setAuthorsShow(false)
        } else {
            setAuthorsShow(false)
        }
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

    const fromeSearchDebounce = useMemo(() => debounce((from) => { // отложенный поиск по дате от
        dispatch(setCreatedFromValue(from))
        dispatch(setCurrentPage(1))
    }, 3000),[dispatch])

    const createdFromChange = (e) => { // выбрать дату от
        setCreatedFrom(e.target.value)
        fromeSearchDebounce(e.target.value)
    }

    const beforeSearchDebounce = useMemo(() => debounce((before) => { // отложенный поиск по дате до
        dispatch(setCreatedBeforeValue(before))
        dispatch(setCurrentPage(1))
    }, 3000),[dispatch])

    const createdBeforeChange = (e) => { // выбрать дату до
        setCreatedBefore(e.target.value)
        beforeSearchDebounce(e.target.value)
    }

    const createdCleare = () => { // очистить даты
        setCreatedFrom('')
        setCreatedBefore('')
        dispatch(setCurrentPage(1))
    }

    if(status === 'loading') return null
    if(status === 'error') return 'Ошибка запроса авторов и локаций'

    return  <div className='section filter'>
                <div className='container'>
                    <div className='filter__items'>
                        <div className='filter__item'>
                            <div className='input'>
                                <input onChange={nameChange} value={nameValue} type='text' placeholder='Name' />
                                { 
                                    nameValue !== '' && (
                                        <div onClick={nameValueCleare} className='input__cleare'>
                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.36474 1.21893C2.07355 0.924339 1.60144 0.924339 1.31025 1.21893C1.01906 1.51351 1.01906 1.99113 1.31025 2.28572L3.94492 4.95114L1.21644 7.71146C0.92525 8.00604 0.92525 8.48366 1.21644 8.77825C1.50763 9.07284 1.97974 9.07284 2.27093 8.77825L4.99941 6.01793L7.72779 8.77815C8.01898 9.07274 8.49109 9.07274 8.78228 8.77815C9.07347 8.48356 9.07347 8.00594 8.78228 7.71136L6.0539 4.95114L8.68848 2.28582C8.97966 1.99124 8.97967 1.51361 8.68848 1.21903C8.39729 0.92444 7.92517 0.924441 7.63399 1.21903L4.99941 3.88434L2.36474 1.21893Z" />
                                            </svg>
                                        </div>
                                    ) 
                                } 
                            </div>
                        </div>
                        <div className={authorsShow ? 'filter__item active' : 'filter__item'}>
                            <div className={authorsShow ? 'select active' : 'select'}>
                                <div ref={authorRef} onClick={() => setAuthorsShow(!authorsShow)} className='option'>
                                    { author }
                                </div>

                                { 
                                    authorId !== 0 && (
                                        <div onClick={() => changeAuthor(0)} className='select__cleare'>
                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.36474 1.21893C2.07355 0.924339 1.60144 0.924339 1.31025 1.21893C1.01906 1.51351 1.01906 1.99113 1.31025 2.28572L3.94492 4.95114L1.21644 7.71146C0.92525 8.00604 0.92525 8.48366 1.21644 8.77825C1.50763 9.07284 1.97974 9.07284 2.27093 8.77825L4.99941 6.01793L7.72779 8.77815C8.01898 9.07274 8.49109 9.07274 8.78228 8.77815C9.07347 8.48356 9.07347 8.00594 8.78228 7.71136L6.0539 4.95114L8.68848 2.28582C8.97966 1.99124 8.97967 1.51361 8.68848 1.21903C8.39729 0.92444 7.92517 0.924441 7.63399 1.21903L4.99941 3.88434L2.36474 1.21893Z" />
                                            </svg>
                                        </div>
                                    )
                                }
                                
                                <div onClick={() => setAuthorsShow(!authorsShow)} className='select__arrow'>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z"/>
                                    </svg>
                                </div>
                                
                                <div className={authorsShow ? 'more show' : 'more'}>
                                    { authorList && authorList.map(item => <div className='option' onClick={() => changeAuthor(item.id)} key={item.id}>{item.name}</div>) }
                                </div>
                            </div>
                        </div>

                        <div className={locationsShow ? 'filter__item active' : 'filter__item'}>
                            <div className={locationsShow ? 'select active' : 'select'}>
                                <div ref={locRef} onClick={() => setLocationsShow(!locationsShow)} className='option'>
                                    { location }
                                </div>

                                { 
                                    locationId !== 0 && (
                                        <div onClick={() => changeLocation(0)} className='select__cleare'>
                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.36474 1.21893C2.07355 0.924339 1.60144 0.924339 1.31025 1.21893C1.01906 1.51351 1.01906 1.99113 1.31025 2.28572L3.94492 4.95114L1.21644 7.71146C0.92525 8.00604 0.92525 8.48366 1.21644 8.77825C1.50763 9.07284 1.97974 9.07284 2.27093 8.77825L4.99941 6.01793L7.72779 8.77815C8.01898 9.07274 8.49109 9.07274 8.78228 8.77815C9.07347 8.48356 9.07347 8.00594 8.78228 7.71136L6.0539 4.95114L8.68848 2.28582C8.97966 1.99124 8.97967 1.51361 8.68848 1.21903C8.39729 0.92444 7.92517 0.924441 7.63399 1.21903L4.99941 3.88434L2.36474 1.21893Z" />
                                            </svg>
                                        </div>
                                    )
                                }
                                
                                <div onClick={() => setLocationsShow(!locationsShow)} className='select__arrow'>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z"/>
                                    </svg>
                                </div>

                                <div className={locationsShow ? 'more show' : 'more'}>
                                    { locationList && locationList.map(item => <div className='option' onClick={() => changeLocation(item.id)} key={item.id}>{item.location}</div>) }
                                </div>
                            </div>
                        </div>
                        <div className='filter__item'>
                            <div className={createdShow ? 'select active' : 'select'}>
                                <div onClick={() => setCreatedShow(!createdShow)} className='option'>
                                    Created
                                </div>
                                <div className={createdShow ? 'more show' : 'more'}>
                                    <div className='option created'>
                                        <div className='created__item'><input onChange={createdFromChange} value={createdFrom} type="text" placeholder='from' /></div>
                                        <div className='created__item dash'></div>
                                        <div className='created__item'><input  onChange={createdBeforeChange} value={createdBefore} type="text" placeholder='before' /></div>
                                    </div>
    
                                </div>

                                { 
                                    (createdFrom !== '' || createdBefore !== '') && (
                                        <div onClick={createdCleare} className='select__cleare'>
                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M2.36474 1.21893C2.07355 0.924339 1.60144 0.924339 1.31025 1.21893C1.01906 1.51351 1.01906 1.99113 1.31025 2.28572L3.94492 4.95114L1.21644 7.71146C0.92525 8.00604 0.92525 8.48366 1.21644 8.77825C1.50763 9.07284 1.97974 9.07284 2.27093 8.77825L4.99941 6.01793L7.72779 8.77815C8.01898 9.07274 8.49109 9.07274 8.78228 8.77815C9.07347 8.48356 9.07347 8.00594 8.78228 7.71136L6.0539 4.95114L8.68848 2.28582C8.97966 1.99124 8.97967 1.51361 8.68848 1.21903C8.39729 0.92444 7.92517 0.924441 7.63399 1.21903L4.99941 3.88434L2.36474 1.21893Z" />
                                            </svg>
                                        </div>
                                    )
                                }
                                
                                <div onClick={() => setCreatedShow(!createdShow)} className='select__arrow'>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z"/>
                                    </svg>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
}

export default Filter