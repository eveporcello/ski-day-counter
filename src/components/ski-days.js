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