import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme, themeSelector } from '../../../../store/themeSlice'
import ThemeSVG from '../../../common/SVG/ThemeSVG/ThemeSVG'


const Theme = props => {
    const dispatch = useDispatch()
    const {theme} = useSelector(themeSelector)

    const themeChange = () => { // меняем тему
        if(theme === 'dark'){
            dispatch(setTheme('light'))
            localStorage.setItem('theme', JSON.stringify('light'))
        } else {
            dispatch(setTheme('dark'))
            localStorage.setItem('theme', JSON.stringify('dark'))
        }
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    useEffect(() => {
        const themeLocal = localStorage.getItem('theme') ? localStorage.getItem('theme').replace(/["]/g, '') : 'dark'
        dispatch(setTheme(themeLocal))
    }, [dispatch])

    return  <div className='header__thema'>
                <div onClick={themeChange} className='theme__btn'>
                    <ThemeSVG />
                </div>
            </div>
}

export default React.memo(Theme)