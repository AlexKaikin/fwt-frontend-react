import React from 'react'
import LogoSVG from '../../../common/SVG/LogoSVG/LogoSVG'


const Logo = props => {
    return  <div className='header__logo logo'>
                <div className='logo__img'>
                    <LogoSVG />
                </div>
            </div>
}

export default React.memo(Logo)