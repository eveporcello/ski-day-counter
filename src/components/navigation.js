import { PropTypes } from 'react'
import { Link } from 'react-router'
import HomeIcon from 'react-icons/lib/fa/home'
import AddDayIcon from 'react-icons/lib/fa/calendar-plus-o'
import ListDaysIcon from 'react-icons/lib/fa/table'
import Terrain from 'react-icons/lib/md/terrain'
import SnowFlake from 'react-icons/lib/ti/weather-snow'
import Calendar from 'react-icons/lib/fa/calendar'
import CloseButton from 'react-icons/lib/fa/close'

export const Menu = () =>
    <nav className="menu">
        <Link to="/" activeClassName="selected">
            <HomeIcon />
        </Link>
        <Link to="/add-day" activeClassName="selected">
            <AddDayIcon />
        </Link>
        <Link to="/list-days" activeClassName="selected">
            <ListDaysIcon />
        </Link>
    </nav>

export const ShowErrors = ({ errors=[], onClearError=f=>f }) =>
    <div className="show-errors">
        {(errors.length) ?
            errors.map((message, i) =>
                <div key={i} className="error">
                    <p>{message}</p>
                    <CloseButton onClick={() => onClearError(i)}/>
                </div>
            ) : null
        }
    </div>

ShowErrors.propTypes = {
    errors: PropTypes.array,
    onClearError: PropTypes.func
}

export const Whoops404 = ({ location }) =>
    <div className="whoops-404">
        <h1>Whoops, route not found</h1>
        <p>Cannot find content for {location.pathname}</p>
    </div>