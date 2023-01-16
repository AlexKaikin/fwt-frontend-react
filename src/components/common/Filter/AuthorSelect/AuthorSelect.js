import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthor } from '../../../../store/filterSlice'
import { setCurrentPage } from '../../../../store/gallerySlice'
import ClearSVG from '../../SVG/ClearSVG/ClearSVG'
import SelectSVG from '../../SVG/SelectSVG/SelectSVG'


const AuthorSelect = ({authors, authorId, authorsShow, setAuthorsShow}) => {
    const dispatch = useDispatch()
    
    let author = authorId === 0 ? 'Author' : authors.find(i => i.id === authorId).name
    const authorRef = useRef()
    if(authorRef.current) { // укарачиваем длинную строку активного автора
        const authorRefWith = Math.round(authorRef.current.offsetWidth / 10)
        if(author.length > authorRefWith) author = author.slice(0,authorRefWith) + '...'
    }

    let authorList = null
    if(authorRef.current) { // укарачиваем длинную строку в списке авторов
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

    const changeAuthor = (id) => { // выбрать автора
        if(authorId !== id) {
            dispatch(setAuthor(id))
            dispatch(setCurrentPage(1))
            setAuthorsShow(false)
        } else {
            setAuthorsShow(false)
        }
    }

    return  <div className={authorsShow ? 'select active' : 'select'}>
                <div ref={authorRef} onClick={() => setAuthorsShow(!authorsShow)} className='option'>{ author }</div>

                { authorId !== 0 && <div onClick={() => changeAuthor(0)} className='select__cleare'><ClearSVG /></div> }
                
                <div onClick={() => setAuthorsShow(!authorsShow)} className='select__arrow'><SelectSVG /></div>
                
                <div className={authorsShow ? 'more show' : 'more'}>
                    { authorList && authorList.map(item => <div className='option' onClick={() => changeAuthor(item.id)} key={item.id}>{item.name}</div>) }
                </div>
            </div>
}

export default React.memo(AuthorSelect)