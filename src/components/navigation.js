import { PropTypes } from 'react'
import CloseButton from 'react-icons/lib/fa/close'
import '../../stylesheets/navigation.scss'

export const ShowError = ({ message, onClose=f=>f, offset=0 }) =>
    <div className="error" style={{ bottom: offset }}>
        <p>{message}</p>
        <CloseButton onClick={onClose} />
    </div>

ShowError.propTypes = {
    meessage: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    offset: PropTypes.number
}

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
        <Link select={selected === 'add-day'}
              onClick={() => onNav("add-day")}>
            Add Day
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