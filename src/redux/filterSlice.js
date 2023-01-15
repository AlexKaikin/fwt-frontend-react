import { createSlice } from '@reduxjs/toolkit'
import { filterAPI } from '../api/api'


const initialState = {
    authors: [], // коллекция авторов
    locations: [], // коллекция локаций
    filterStatus: 'loading', // статус загрузки

    nameQuery: '', // поиск по имени
    authorId: 0, // выбранный автор
    locationId: 0, // выбранная локация
    createdFrom: '', // дата от
    createdBefore: '', // дата до
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAuthors: (state, action) => {
      state.authors = action.payload
    },
    setLocations: (state, action) => {
        state.locations = action.payload
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload
    },
    setNameQuery: (state, action) => {
      state.nameQuery = action.payload
  },
    setAuthor: (state, action) => {
        state.authorId = action.payload
    },
    setLocation: (state, action) => {
        state.locationId = action.payload
    },
    setCreatedFromValue: (state, action) => {
      state.createdFrom = action.payload
    },
    setCreatedBeforeValue: (state, action) => {
      state.createdBefore = action.payload
    },
  },
})

// Action
export const { 
              setAuthors, 
              setLocations, 
              setFilterStatus, 
              setNameQuery, 
              setAuthor, 
              setLocation,
              setCreatedFromValue,
              setCreatedBeforeValue } = filterSlice.actions

export default filterSlice.reducer

// Selector
export const filterSelector = (state) => state.filter

// thunk
// загрузка авторов и локаций
export const getFilter = () => async dispatch => {
  dispatch(setFilterStatus('loading'))
  try {
    const res = await filterAPI.getAuthors()
    dispatch(setAuthors(res.data))
    
    try {
        const result = await filterAPI.getLocations()
        dispatch(setLocations(result.data))
        dispatch(setFilterStatus('success'))
    } catch (err) {
        dispatch(setFilterStatus('error'))
        console.log(err)
    }
  } catch (err) {
    dispatch(setFilterStatus('error'))
    console.log(err)
  }
}
