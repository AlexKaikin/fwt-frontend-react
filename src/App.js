import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Header from './components/layout/Header/Header'
import Main from './components/layout/Main/Main'
import { getFilter } from './redux/filterSlice'


const App = props => {
  const dispatch = useDispatch()
  const themeLocal = localStorage.getItem('theme') ? localStorage.getItem('theme').replace(/["]/g, '') : 'dark'

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

  return  <div className='wrapper'>
            <Header themeChange={themeChange} />
            <Main />
          </div>
}

export default App;
