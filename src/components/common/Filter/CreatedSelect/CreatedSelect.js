import debounce from 'lodash.debounce'
import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCreatedBeforeValue, setCreatedFromValue } from '../../../../store/filterSlice'
import { setCurrentPage } from '../../../../store/gallerySlice'
import ClearSVG from '../../SVG/ClearSVG/ClearSVG'
import SelectSVG from '../../SVG/SelectSVG/SelectSVG'


const CreatedSelect = props => {
    const dispatch = useDispatch()
    const [createdShow, setCreatedShow] = useState(false) // показать ввод даты
    const [createdFrom, setCreatedFrom] = useState('') // фильтр по дате от 
    const [createdBefore, setCreatedBefore] = useState('') // фильтр по дате до

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
        dispatch(setCreatedFromValue(''))
        dispatch(setCreatedBeforeValue(''))
        dispatch(setCurrentPage(1))
    }

    return  <div className={createdShow ? 'select active' : 'select'}>
                <div onClick={() => setCreatedShow(!createdShow)} className='option'>Created</div>

                <div className={createdShow ? 'more show' : 'more'}>
                    <div className='option created'>
                        <div className='created__item'><input onChange={createdFromChange} value={createdFrom} type="number" placeholder='from' /></div>
                        <div className='created__item dash'></div>
                        <div className='created__item'><input  onChange={createdBeforeChange} value={createdBefore} type="number" placeholder='before' /></div>
                    </div>
                </div>

                {(createdFrom !== '' || createdBefore !== '') && <div onClick={createdCleare} className='select__cleare'><ClearSVG /></div>}
                
                <div onClick={() => setCreatedShow(!createdShow)} className='select__arrow'><SelectSVG /></div>

            </div>
}

export default React.memo(CreatedSelect)