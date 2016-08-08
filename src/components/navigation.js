import { PropTypes } from 'react'
import '../../stylesheets/navigation.scss'

export const Link = ({ children, select=false, onClick=f=>f }) =>
    (select) ?
        <span>{children}</span> :
        <a href="#"
           onClick={e => {
               e.preventDefault()
               onClick()
        }}>{children}</a>

Link.propTypes = {
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
}

export const Menu = ({ selected="home", onNav=f=>f }) =>
    <nav className="menu">
        <Link select={selected === 'home'}
              onClick={() => onNav("home")}>
            Home
        </Link>
        <Link select={selected === 'ski-days'}
              onClick={() => onNav("ski-days")}>
            Ski Days
        </Link>
    </nav>

Menu.propTypes = {
    selected: PropTypes.string,
    onNav: PropTypes.func,
    children: PropTypes.string.isRequired
}