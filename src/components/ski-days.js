import '../../stylesheets/ski-days.scss'
import { PropTypes } from 'react'
import Terrain from 'react-icons/lib/md/terrain'
import SnowFlake from 'react-icons/lib/ti/weather-snow'
import Calendar from 'react-icons/lib/fa/calendar'

export const SkiDayCount = ({ total=0, powder=0, backcountry=0 }) =>
    <div className="ski-day-count">
        <span className="total-days">
            {total}
            <Calendar />
            total
        </span>
        <span className="powder-days">
            {powder}
            <SnowFlake />
            powders days
        </span>
        <span className="backcountry-days">
            {backcountry}
            <Terrain />
            backcountry days
        </span>
    </div>

SkiDayCount.propTypes = {
    total: PropTypes.number,
    powder: PropTypes.number,
    backcountry: PropTypes.number
}

const SkiDayRow = ({ resort, date, powder, backcountry }) =>
    <tr>
        <td>
            {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
        </td>
        <td>
            {resort}
        </td>
        <td>
            {(powder) ? <SnowFlake /> : null }
        </td>
        <td>
            {(backcountry) ? <Terrain /> : null }
        </td>
    </tr>

SkiDayRow.propTypes = {
    resort: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    powder: PropTypes.bool,
    backcountry: PropTypes.bool
}

export const SkiDayList = ({ days }) =>
    <div className="ski-day-list">
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Resort</th>
                <th><SnowFlake /></th>
                <th><Terrain /></th>
            </tr>
            </thead>
            <tbody>
            {days.map((day, i) =>
                <SkiDayRow key={i} {...day} />
            )}
            </tbody>
        </table>
    </div>

SkiDayList.propTypes = {
    days: (props) => (!Array.isArray(props.days)) ?
        new Error("SkiDayList days property must be an array") :
        (!props.days.length) ?
            new Error("SkiDayList days array must contain at least one record") :
            null
}