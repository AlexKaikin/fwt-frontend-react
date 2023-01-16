import React from 'react'
import Logo from './Logo/Logo'
import Theme from './Theme/Theme'


const Header = props => {
    return  <header className='header'>
                <div className='container'>
                    <Logo />
                    <Theme />
                </div>
            </header>
}

export default React.memo(Header)