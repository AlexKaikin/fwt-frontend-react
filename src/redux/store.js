import { configureStore } from '@reduxjs/toolkit'

import galleryReducer from '../redux/gallerySlice'
import filterReducer from '../redux/filterSlice'


export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    filter: filterReducer,
  },
})
