import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Header from './components/layout/Header/Header'
import Main from './components/layout/Main/Main'
import { getFilter } from './redux/filterSlice'


const App = props => {
  const dispatch = useDispatch()
  const themeLocal = window?.localStorage?.getItem('theme').replace(/["]/g, '')

  const [theme, setTheme] = useState(themeLocal)
  const themeChange = () => {
    if(theme === 'dark'){
      setTheme('light')
      localStorage.setItem('theme', JSON.stringify('light'))
    } else {
      setTheme('dark')
      localStorage.setItem('theme', JSON.stringify('dark'))
    }
  }

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    dispatch(getFilter())
  }, [dispatch])
  return  <BrowserRouter>
            <div className='wrapper'>
              <Header themeChange={themeChange} />
              <Main />
            </div>
          </BrowserRouter>
}

export default App;
