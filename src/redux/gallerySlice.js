import { createSlice } from '@reduxjs/toolkit'
import { galleryAPI } from '../api/api'


const initialState = {
  galleryItems: [],

  // статус загрузки товаров/товара
  galleryStatus: 'loading', // loading, success, error

  // пагинация
  pagesCount: 0,    // количество страниц товаров
  totalItems: 0,    // количество товаров на сервере
  limitItems: 12,   // лимит товаров на страницу
  currentPage: 1,   // текущая страница
}

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setGalleryItems: (state, action) => {
      state.galleryItems = action.payload
      state.galleryStatus = 'success'
    },
    setGalleryStatus: (state, action) => {
      state.galleryStatus = action.payload
    },
    setTotalItems: (state, action) => {
      state.totalItems = +action.payload
      state.pagesCount = Math.ceil(+action.payload / initialState.limitItems)
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})

// Action
export const { setGalleryItems, setGalleryStatus, setTotalItems, setCurrentPage } = gallerySlice.actions

export default gallerySlice.reducer

// Selector
export const gallerySelector = (state) => state.gallery

// thunk
// загрузка товаров
export const getGalleryItems = (nameValue, authorId, locationId, createdFrom, createdBefore, currentPage) => async dispatch => {
  dispatch(setGalleryStatus('loading'))
  try {
    const res = await galleryAPI.getGallery(nameValue, authorId, locationId, createdFrom, createdBefore, currentPage, initialState.limitItems)
    dispatch(setGalleryItems(res.data))
    res.headers['x-total-count'] && dispatch(setTotalItems(res.headers['x-total-count']))
  } catch (err) {
    dispatch(setGalleryStatus('error'))
    console.log(err)
  }
}
