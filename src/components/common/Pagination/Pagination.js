import React from 'react'
import ChevronDoubleLeft from '../SVG/ChevronDoubleLeft/ChevronDoubleLeft'
import ChevronDoubleRight from '../SVG/ChevronDoubleRight/ChevronDoubleRight'
import ChevronLeft from '../SVG/ChevronLeft/ChevronLeft'
import ChevronRight from '../SVG/ChevronRight/ChevronRight'


const Pagination = ({pagesCount, currentPage, currentPageChange}) => {
    const pages = [] // массив страниц

    const createPages = (pages, pagesCount, currentPage) => { // функция заполнения массива числами
        if(pagesCount > 5) {
            if(currentPage > 4) {
                for (let i = currentPage-2; i <= currentPage+2; i++) {
                    pages.push(i)
                    if(i === pagesCount) break
                }
            } else {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i)
                    if(i === pagesCount) break
                }
            }
        }  else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }
    }

    createPages(pages, pagesCount, currentPage) // заполняем массив страниц

    if(pages.length < 2) return null // если 1 страница то не показываем пагинацию

    return  <div className='pagination'>
                <button onClick={() => currentPageChange(1)} className='page' disabled={currentPage === 1} >
                    <ChevronDoubleLeft />
                </button>
                <button onClick={() => currentPageChange(currentPage - 1)} className='page' disabled={currentPage === 1}>
                    <ChevronLeft />
                </button>
                
                { // страницы
                    pages?.map(page => <button key={page} onClick={() => currentPage !== page && currentPageChange(page)} className={currentPage === page ? 'page active' : 'page'}>{page}</button>) 
                }
                <button onClick={() => currentPageChange(currentPage + 1)} className='page' disabled={currentPage === pagesCount}>
                    <ChevronRight />
                </button>
                <button onClick={() => currentPageChange(pagesCount)} className='page' disabled={currentPage === pagesCount}>
                    <ChevronDoubleRight />
                </button>
            </div>
}

export default React.memo(Pagination)
