import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://test-front.framework.team/',
})

export const galleryAPI = {
    getGallery(nameQuery, authorId, locationId, createdFrom, createdBefore, currentPage, limitItems) {
        
        // функция генерирует параметр либо ничего
        const paramCreator = (key, value) => value === '' || value === 0 ? `` : `${key}=${value}&`
        
        const queryName = paramCreator('q', nameQuery)
        const author = paramCreator('authorId', authorId)
        const location = paramCreator('locationId', locationId) 
        const createdFromValue = paramCreator('created_gte', createdFrom)
        const createdBeforeValue = paramCreator('created_lte', createdBefore)
        const pagination = `_page=${currentPage}&_limit=${limitItems}`

        return instance.get(`paintings/?${queryName + author + location + createdFromValue + createdBeforeValue + pagination}`)
    },
}

export const filterAPI = {
    getAuthors() {
        return instance.get(`authors`)
    },

    getLocations() {
        return instance.get(`locations`)
    },
}
