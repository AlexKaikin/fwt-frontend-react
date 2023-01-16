import { configureStore } from '@reduxjs/toolkit'

import galleryReducer from './gallerySlice'
import filterReducer from './filterSlice'
import themeReducer from './themeSlice'


export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    filter: filterReducer,
    theme: themeReducer,
  },
})
