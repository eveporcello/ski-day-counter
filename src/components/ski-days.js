import '../../stylesheets/ski-days.scss'
import { PropTypes } from 'react'
import Terrain from 'react-icons/lib/md/terrain'
import SnowFlake from 'react-icons/lib/ti/weather-snow'
import Calendar from 'react-icons/lib/fa/calendar'
import { Link, withRouter } from 'react-router'

const decimalToPercent = decimal => Math.floor(decimal * 100) + '%'

const calcGoalProgress = (total, goal) => decimalToPercent(total / goal)


export const GoalSetter = ({goal, newGoal=f=>f}) => {

    let _input
    const change = () => newGoal(_input.value)

    return (
        <div className="goal-setter">
            <input type="number"
                   ref={el=>_input = el}
                   defaultValue={goal}
                   onChange={change}/>
        </div>
    )
}

export const SkiDayCount = ({ total=0, powder=0, backcountry=0, goal, newGoal }) =>
    <div className="ski-day-count">
        <span className="total-days">
            {total}
            <Calendar />
            total
        </span>
        <div className="goal-progress">
            {calcGoalProgress(total, goal)} complete!
            <GoalSetter goal={goal} newGoal={newGoal}/>
        </div>
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
    backcountry: PropTypes.number,
    goal: PropTypes.number.isRequired
}

const SkiDayRow = ({ resort, date, powder, backcountry }) =>
    <tr>
        <td>
            {date}
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

export const SkiDayList = ({ days, filter}) => {

    const filteredDays = (!filter || !filter.match(/powder|backcountry/)) ?
        days :
        days.filter(day => day[filter])

    const activeFilterStyle = {
        textDecoration: 'none',
        color: 'black'
    }

    return (
        <div className="ski-day-list">
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Resort</th>
                    <th><SnowFlake /></th>
                    <th><Terrain /></th>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <Link to="/ski-days" style={(!filter) ? activeFilterStyle : null}>All Days</Link>
                        <Link to="/ski-days/powder" activeStyle={activeFilterStyle}>Powder Days</Link>
                        <Link to="/ski-days/backcountry" activeStyle={activeFilterStyle}>Backcountry Days</Link>
                    </td>
                </tr>
                </thead>
                <tbody>
                {filteredDays.map((day, i) =>
                    <SkiDayRow key={i} {...day} />
                )}
                </tbody>
            </table>
        </div>
    )
}

SkiDayList.propTypes = {
    filter: PropTypes.oneOf(['powder', 'backcountry']),
    days: (props) => (!Array.isArray(props.days)) ?
        new Error("SkiDayList days property must be an array") :
        (!props.days.length) ?
            new Error("SkiDayList days array must contain at least one record") :
            null
}

export const AddDay = withRouter(({ onNewDay=f=>f, router}) => {

    let _resort, _date, _powder, _backcountry

    const submit = e => {
        e.preventDefault()
        onNewDay({
            resort: _resort.value,
            date: _date.value.toString(),
            powder: _powder.checked,
            backcountry: _backcountry.checked
        })
        _resort.value = ''
        _date.value = ''
        _powder.checked = false
        _backcountry.checked = false

        router.push('/')
    }

    return (
        <form onSubmit={submit} className="add-day">

            <label htmlFor="date">Resort Name</label>
            <input type="text"
                   ref={input => _resort = input}
                   required/>

            <label htmlFor="date">Date</label>
            <input id="date"
                   type="date"
                   ref={input => _date = input}
                   required/>

            <div>
                <input id="powder-day"
                       ref={input => _powder = input}
                       type="checkbox"/>
                <label htmlFor="powder-day">Powder Day</label>
            </div>

            <div>
                <input id="backcountry-day"
                       ref={input => _backcountry = input}
                       type="checkbox"/>
                <label htmlFor="backcountry-day">Backcountry Day</label>
            </div>

            <button>Add Day</button>

        </form>
    )
})

AddDay.propTypes = {
    onNewDay: PropTypes.func
}
