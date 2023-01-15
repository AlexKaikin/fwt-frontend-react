import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://test-front.framework.team/',
})

export const galleryAPI = {
    getGallery(nameQuery, authorId, locationId, createdFrom, createdBefore, currentPage, limitItems) {
        const quaryName = nameQuery === '' ? `` : `name=${nameQuery}&` 
        const author = authorId === 0 ? `` : `authorId=${authorId}&`
        const location = locationId === 0 ? `` : `locationId=${locationId}&`
        const createdFromValue = createdFrom === '' ? `` : `created_gte=${createdFrom}&`
        const createdBeforeValue = createdBefore === '' ? `` : `created_lte=${createdBefore}&`
        const pagination = `_page=${currentPage}&_limit=${limitItems}`
        return instance.get(`paintings/?${quaryName + author + location + createdFromValue + createdBeforeValue + pagination}`)
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
