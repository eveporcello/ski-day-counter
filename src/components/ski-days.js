import { PropTypes, Component } from 'react'
import Terrain from 'react-icons/lib/md/terrain'
import SnowFlake from 'react-icons/lib/ti/weather-snow'
import Calendar from 'react-icons/lib/fa/calendar'
import Downloading from 'react-icons/lib/fa/cloud-download'
import { Link, withRouter } from 'react-router'
import fetch from 'isomorphic-fetch'
import '../stylesheets/ui.scss'

export const GoalProgress = ({current, goal=10, onNewGoal=f=>f}) => {

    let _input
    const progress = Math.floor(current / goal * 100)

    return (
        <div className="goal-progress">
            <progress value={current} max={goal}/>
            <span>{progress}%</span>
            <input type="number"
                   ref={input=>_input=input}
                   defaultValue={goal}
                   onChange={() => onNewGoal(_input.value)}/>
            <span>days</span>
        </div>
    )

}

GoalProgress.propTypes = {
    current: PropTypes.number.isRequired,
    goal: PropTypes.number,
    onNewGoal: PropTypes.func
}

export const SkiDayCount = ({ total=0, powder=0, backcountry=0 }) =>
    <div className="ski-day-count">
        <div className="total-days">
            <span>{total}</span>
            <Calendar />
            <span>days</span>
        </div>
        <div className="powder-days">
            <span>{powder}</span>
            <SnowFlake />
            <span>powder</span>
        </div>
        <div className="backcountry-days">
            <span>{backcountry}</span>
            <Terrain />
            <span>hiking</span>
        </div>
    </div>

SkiDayCount.propTypes = {
    total: PropTypes.number,
    powder: PropTypes.number,
    backcountry: PropTypes.number
}

const SkiDayRow = ({ resort, date, powder, backcountry, onRemoveDay=f=>f }) =>
    <tr onDoubleClick={() => onRemoveDay(date)}>
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
    date: PropTypes.string.isRequired,
    powder: PropTypes.bool,
    backcountry: PropTypes.bool,
    onRemoveDay: PropTypes.func
}

export const SkiDayList = ({ days, filter, onRemoveDay=f=>f }) => {

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
                <caption>double click to remove</caption>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Resort</th>
                    <th><SnowFlake /></th>
                    <th><Terrain /></th>
                </tr>
                <tr>
                    <td colSpan={4}>
                        <Link to="/list-days" style={(!filter) ? activeFilterStyle : null}>All Days</Link>
                        <Link to="/list-days/powder" activeStyle={activeFilterStyle}>Powder Days</Link>
                        <Link to="/list-days/backcountry" activeStyle={activeFilterStyle}>Backcountry Days</Link>
                    </td>
                </tr>
                </thead>
                <tbody>
                {filteredDays.map((day, i) =>
                    <SkiDayRow key={i} {...day} onRemoveDay={onRemoveDay} />
                )}
                </tbody>
            </table>
        </div>
    )
}

SkiDayList.propTypes = {
    filter: PropTypes.oneOf(['powder', 'backcountry']),
    onRemoveDay: PropTypes.func,
    days: (props) => (!Array.isArray(props.days)) ?
        new Error("SkiDayList days property must be an array") :
        (!props.days.length) ?
            new Error("SkiDayList days array must contain at least one record") :
            null
}

class Autocomplete extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fetching: false,
            suggestions: []
        }
        this.onChange = this.onChange.bind(this)
    }

    set value(newValue) {
        this.refs.searchTerm.value = newValue
    }

    get value() {
        return this.refs.searchTerm.value
    }

    onChange() {

        const { feed } = this.props
        const { value } = this.refs.searchTerm
        const { fetching } = this.state

        if (value && !fetching) {

            this.setState({ fetching: true })
            fetch(`${feed}/${value}`)
                .then(response => response.json())
                .then(suggestions => (!this.value) ?
                    this.setState({ fetching: false, suggestions: [] }) :
                    this.setState({ fetching: false, suggestions })
                )

        } else {
            this.setState({ suggestions: [] })
        }
    }

    render() {

        const { suggestions, fetching } = this.state
        const { onChange } = this

        return (
            <div className="autocomplete">

                <input ref="searchTerm"
                       type="text"
                       placeholder="mountain or resort..."
                       onChange={onChange}
                       onFocus={onChange}
                       onBlur={() => setTimeout(onClear, 250)}
                />

                <span>{(fetching) ? <Downloading /> : null }</span>

                <div className="suggestions">
                    {suggestions.map((item, i) =>
                        <p key={i} onClick={() => {
                            this.refs.searchTerm.value = item
                            this.setState({ suggestions: [] })
                        }}>{item}</p>
                    )}
                </div>

            </div>
        )
    }

}

export const AddDayForm = withRouter(({ suggestions=[], onNewDay=f=>f, onChange=f=>f, onClear=f=>f, fetching=false, router}) => {

    let _resort, _date, _powder, _backcountry

    const submit = e => {
        e.preventDefault()
        onNewDay({
            resort: _resort.value,
            date: _date.value.toString(),
            powder: _powder.checked,
            backcountry: _backcountry.checked
        })


        const addAnother = confirm(`${_resort.value} on ${_date.value.toString()} added. Add another?`)

        if (!addAnother) {
            router.push('/')
        }

        _resort.value = ''
        _date.value = ''
        _powder.checked = false
        _backcountry.checked = false

    }

    return (
        <form onSubmit={submit} className="add-day">

            <label htmlFor="date">Resort Name</label>

            <Autocomplete ref={input => _resort = input}
                          feed="http://localhost:3333/resorts" />

            <label htmlFor="date">Date</label>
            <input id="date"
                   type="date"
                   ref={input => _date = input}
                   required/>

            <div>
                <input id="powder-day"
                       ref={input => _powder = input}
                       type="checkbox"/>
                <label htmlFor="powder-day">Powder</label>
            </div>

            <div>
                <input id="backcountry-day"
                       ref={input => _backcountry = input}
                       type="checkbox"/>
                <label htmlFor="backcountry-day">Backcountry</label>
            </div>

            <button>Add Day</button>

        </form>
    )
})

AddDayForm.propTypes = {
    suggestions: PropTypes.array,
    onNewDay: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    router: PropTypes.object
}
