import { PropTypes } from 'react'
import { Link } from 'react-router'
import CloseButton from 'react-icons/lib/fa/close'
import '../../stylesheets/navigation.scss'

export const Menu = () =>
    <nav className="menu">
        <Link to="/" activeClassName="selected">Home</Link>
        <Link to="/add-day" activeClassName="selected">Add Day</Link>
        <Link to="/ski-days" activeClassName="selected">Ski Days</Link>
    </nav>

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

export const Whoops404 = ({ location }) =>
    <div className="whoops-404">
        <h1>Whoops, route not found</h1>
        <p>Cannot find content for {location.pathname}</p>
    </div>