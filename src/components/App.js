import { Component } from 'react'
import { SkiDayList, SkiDayCount, AddDayForm } from './ski-days'
import GoalProgress from './GoalProgress'
import { Menu, ShowError } from './navigation'
import { equals } from 'ramda'
import '../stylesheets/index.scss'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = (localStorage.skiDayState) ?
            JSON.parse(localStorage.skiDayState) :
        {
            skiDays: [],
            errors: [],
            goal: 10
        }
        this.addDay = this.addDay.bind(this)
        this.setGoal = this.setGoal.bind(this)
        this.addError = this.addError.bind(this)
        this.clearErrorAt = this.clearErrorAt.bind(this)
        this.countDays = this.countDays.bind(this)
    }

    countDays(filter) {
        return this.state.skiDays.filter(day=> (filter) ? day[filter] : day).length
    }

    addDay(newDay) {
        const alreadySkied = this.state.skiDays.some(day => day.date === newDay.date)
        if (alreadySkied) {
            this.addError(`You already skied on ${newDay.date}`)
        } else {
            this.setState({
                currentScreen: 'home',
                skiDays: [
                    ...this.state.skiDays,
                    newDay
                ]
            })
        }
    }

    addError(message) {
        this.setState({
            errors: [
                ...this.state.errors,
                new Error(message)
            ]
        })
    }

    clearErrorAt(index) {
        const errors = this.state.errors.filter((err, i) => index !== i)
        this.setState({errors})
    }

    setGoal(goal) {
        this.setState({goal})
    }

    componentWillMount() {
        this.handleError = ({message}) => this.addError(`Something went wrong ${message}`)
        window.addEventListener("error", this.handleError)
    }

    componentDidMount() {
        localStorage.skiDayState = JSON.stringify(this.state)
    }

    componentWillUnmount() {
        window.removeEventListener("error", this.handleError)
    }

    componentDidUpdate() {
        localStorage.skiDayState = JSON.stringify(this.state)
    }

    render() {

        const { skiDays, goal, errors } = this.state,
            { location, params } = this.props,
            totalDays = skiDays.length,
            powderDays = this.countDays('powder'),
            backcountryDays = this.countDays('backcountry')

        return (
            <div className="app">

                <Menu goal={goal} onNav={this.goToScreen}/>

                {(location.pathname === '/') ?
                    <SkiDayCount total={totalDays}
                                 goal={goal}
                                 powder={powderDays}
                                 backcountry={backcountryDays}/> :
                    (location.pathname === '/add-day') ?
                        <AddDayForm onNewDay={this.addDay} onError={this.addError} /> :
                        <SkiDayList days={skiDays} filter={params.filter}/>
                }

                {(errors.length) ?
                    errors.map((err, i) =>
                        <ShowError key={i}
                                   onClose={() => this.clearErrorAt(i)}
                                   message={err.message}
                                   offset={i*3}/>
                    ) : null
                }

                <GoalProgress current={skiDays.length} goal={goal} save={this.setGoal}/>

            </div>
        )
    }
}

export default App