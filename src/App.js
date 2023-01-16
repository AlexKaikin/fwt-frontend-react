import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from './components/layout/Header/Header'
import Main from './components/layout/Main/Main'
import { getFilter } from './store/filterSlice'


const App = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFilter())
  }, [dispatch])

  return  <div className='wrapper'>
            <Header />
            <Main />
          </div>
}

export default App;
