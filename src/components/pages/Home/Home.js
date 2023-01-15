import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filterSelector } from '../../../redux/filterSlice'
import { gallerySelector, getGalleryItems, setCurrentPage } from '../../../redux/gallerySlice'
import Filter from '../../common/Filter/Filter'
import Pagination from '../../common/Pagination/Pagination'
import GalleryItems from './GalleryItems/GalleryItems'


const Home = props => {
    const dispatch = useDispatch()
    const { authors, locations, filterStatus, nameQuery, authorId, locationId, createdFrom, createdBefore } = useSelector(filterSelector)
    const { galleryItems, pagesCount, currentPage, galleryStatus } = useSelector(gallerySelector)

    const currentPageChange = (number) => dispatch(setCurrentPage(number)) // пагинация, смена страницы

    useEffect(() => {
        dispatch(getGalleryItems(nameQuery, authorId, locationId, createdFrom, createdBefore, currentPage))
        window.scrollTo(0, 0)
    }, [dispatch, nameQuery, authorId, locationId, createdFrom, createdBefore, currentPage])

    return  <>
                <Filter authors={authors} locations={locations} status={filterStatus} authorId={authorId} locationId={locationId} />
                
                <div className='section gallary'>
                    <div className='container'>
                        <GalleryItems galleryItems={galleryItems} authors={authors} locations={locations} galleryStatus={galleryStatus} filterStatus={filterStatus} />
                        <Pagination pagesCount={pagesCount} currentPage={currentPage} currentPageChange={currentPageChange} />
                    </div>
                </div>
            </>
}

export default Home