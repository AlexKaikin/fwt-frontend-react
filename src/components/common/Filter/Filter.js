import React, { useState } from 'react'

import NameInput from './NameInput/NameInput'
import AuthorSelect from './AuthorSelect/AuthorSelect'
import LocationSelect from './LocationSelect/LocationSelect'
import CreatedSelect from './CreatedSelect/CreatedSelect'


const Filter = ({ authors, locations, authorId, locationId, status }) => {
    const [authorsShow, setAuthorsShow] = useState(false) // показать список авторов
    const [locationsShow, setLocationsShow] = useState(false) // показать список локаций

    if(status === 'loading') return null
    if(status === 'error') return 'Ошибка запроса авторов и локаций'

    return  <div className='section filter'>
                <div className='container'>
                    <div className='filter__items'>
                        <div className='filter__item'>
                            <NameInput />
                        </div>
                        <div className={authorsShow ? 'filter__item active' : 'filter__item'}>
                            <AuthorSelect authors={authors} authorId={authorId} authorsShow={authorsShow} setAuthorsShow={setAuthorsShow} />
                        </div>

                        <div className={locationsShow ? 'filter__item active' : 'filter__item'}>
                            <LocationSelect locationsShow={locationsShow} setLocationsShow={setLocationsShow} locationId={locationId} locations={locations} />
                        </div>
                        <div className='filter__item'>
                            <CreatedSelect />
                        </div>
                    </div>
                </div>
            </div>
}

export default React.memo(Filter)