import debounce from 'lodash.debounce'
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNameQuery } from '../../../../store/filterSlice'
import { setCurrentPage } from '../../../../store/gallerySlice'
import ClearSVG from '../../SVG/ClearSVG/ClearSVG'


const NameInput = props => {
    const dispatch = useDispatch()
    const [nameValue, setNameValue] = useState('') // фильтр по названию

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

    return  <div className='input'>
                <input onChange={nameChange} value={nameValue} type='text' placeholder='Name' />
                { nameValue !== '' && <div onClick={nameValueCleare} className='input__cleare'><ClearSVG /></div> } 
            </div>
}

export default React.memo(NameInput)