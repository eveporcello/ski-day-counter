import { Component } from 'react'
import { SkiDayList, SkiDayCount, AddDay } from './ski-days'
import { Menu, ShowError } from './navigation'
import '../../stylesheets/App.scss'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            skiDays: [
                {
                    "resort": "squaw valley",
                    "date": "2016-10-09",
                    "powder": false,
                    "backcountry": false
                },
                {
                    "resort": "Heavenly",
                    "date": "2016-10-05",
                    "powder": true,
                    "backcountry": false
                },
                {
                    "resort": "kirkwood",
                    "date": "2016-10-04",
                    "powder": true,
                    "backcountry": false
                },
                {
                    "resort": "squaw valley",
                    "date": "2016-10-03",
                    "powder": false,
                    "backcountry": false
                },
                {
                    "resort": "castle peak",
                    "date": "2016-10-01",
                    "powder": false,
                    "backcountry": true
                }
            ],
            errors: [],
            goal: 10
        }
        this.addDay = this.addDay.bind(this)
        this.setGoal = this.setGoal.bind(this)
        this.clearErrorAt = this.clearErrorAt.bind(this)
        this.countDays = this.countDays.bind(this)
    }

    countDays(filter) {
        return this.state.skiDays.filter(day=> (filter) ? day[filter] : day).length
    }

    addDay(newDay) {
        const alreadySkied = this.state.skiDays.some(day => day.date === newDay.date)
        if (alreadySkied) {
            this.setState({
                errors: [
                    ...this.state.errors,
                    new Error(`You already skied on ${newDay.date}`)
                ]
            })
        } else {
            this.setState({
                currentScreen: 'home',
                skiDays: [
                    ...this.state.skiDays,
                    newDay
                ].sort((a, b) => new Date(b.date) - new Date(a.date))
            })
        }
    }

    clearErrorAt(index) {
        const errors = this.state.errors.filter((err, i) => index !== i)
        this.setState({errors})
    }

    setGoal(goal) {
        this.setState({goal})
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
                                 backcountry={backcountryDays}
                                 newGoal={this.setGoal}/> :
                    (location.pathname === '/add-day') ?
                        <AddDay onNewDay={this.addDay}/> :
                        <SkiDayList days={skiDays} filter={params.filter} />
                }

                {(errors.length) ?
                    errors.map((err, i) =>
                        <ShowError key={i}
                                   onClose={() => this.clearErrorAt(i)}
                                   message={err.message}
                                   offset={i*3}/>
                    ) : null
                }
            </div>
        )
    }
}

export default App