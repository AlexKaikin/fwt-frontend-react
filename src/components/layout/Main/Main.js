import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('../../pages/Home/Home'))

const Main = props => {
    return  <main className='main'>
                <Suspense>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                </Suspense>
            </main>
}

export default Main