import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  theme: '',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

// Action
export const { setTheme } = themeSlice.actions

export default themeSlice.reducer

// Selector
export const themeSelector = (state) => state.theme
