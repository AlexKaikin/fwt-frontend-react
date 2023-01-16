import React from 'react'


const GalleryItems = ({galleryItems, authors, locations, galleryStatus, filterStatus}) => {
    if(galleryStatus === 'loading') return <p>Загрузка...</p>
    if(galleryStatus === 'success' && galleryItems.length === 0) return <p>Картин нет</p>
    if(galleryStatus === 'error') return <p>Ошибка при запросе картин</p>

    return <div className='gallery__items'>
            {
                galleryStatus === 'success' && galleryItems.map(item => <div key={item.id} className='gallery__item item'>
                    <img src={`https://test-front.framework.team${item.imageUrl}`} alt={item.name} />
                    <div className='item__info info'>
                        <div className='info__item'>{item.name}</div>

                        <div className='item__more'>
                            <div className='info__item'>Author: <span>{filterStatus === 'success' && authors.find(i => i.id === item.authorId).name}</span></div>
                            <div className='info__item'>Created: <span>{item.created}</span></div>
                            <div className='info__item'>Location: <span>{filterStatus === 'success' && locations.find(i => i.id === item.locationId).location}</span></div>
                        </div>
                    </div>
                </div>)
            }
        </div>
}

export default React.memo(GalleryItems)