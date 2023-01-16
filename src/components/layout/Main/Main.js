import React from 'react'
import Home from '../../pages/Home/Home'


const Main = props => {
    return  <main className='main'>
                <Home />
            </main>
}

export default React.memo(Main)