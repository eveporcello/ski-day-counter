import { Component } from 'react'
import { SkiDayList, SkiDayCount, AddDay } from './ski-days'
import { Menu, ShowError } from './navigation'
import '../../stylesheets/App.scss'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            skiDays: [],
            currentScreen: "home",
            errors: []
        }
        this.goToScreen = this.goToScreen.bind(this)
        this.addDay = this.addDay.bind(this)
        this.clearErrorAt = this.clearErrorAt.bind(this)
    }

    countDays(days = [], filter) {
        return days.filter(day=> (filter) ? day[filter] : day).length
    }

    addDay(day) {

        const allDates = this.state.skiDays.map(d=>d.date),
            allResorts = this.state.skiDays.map(d=>d.resort),
            hasDate = allDates.some(d=>d === day.date),
            hasResort = allResorts.some(r=>r.toLowerCase() === day.resort.toLowerCase())

        if (hasDate && hasResort) {
            this.setState({
                errors: [
                    ...this.state.errors,
                    new Error(`You already skied at ${day.resort} on ${day.date}`)
                ]
            })
        } else {
            this.setState({
                currentScreen: 'home',
                skiDays: [
                    ...this.state.skiDays,
                    day
                ].sort((a, b) => new Date(b.date) - new Date(a.date))
            })
        }
    }

    goToScreen(currentScreen) {
        this.setState({currentScreen})
    }

    clearErrorAt(index) {
        const errors = this.state.errors.filter((err, i) => index !== i)
        this.setState({errors})
    }

    render() {
        const { currentScreen, skiDays, errors } = this.state,
            totalDays = this.countDays(skiDays),
            powderDays = this.countDays(skiDays, 'powder'),
            backcountryDays = this.countDays(skiDays, 'backcountry')
        return (
            <div className="app">

                <Menu selected={currentScreen} onNav={this.goToScreen}/>

                {(currentScreen === 'ski-days') ?
                    <SkiDayList days={skiDays}/> :
                    (currentScreen === 'add-day') ?
                        <AddDay onNewDay={this.addDay}/> :
                        <SkiDayCount total={totalDays}
                                     powder={powderDays}
                                     backcountry={backcountryDays}/>
                }

                {(errors.length) ?
                    errors.map((err, i) =>
                        <ShowError key={i}
                                   onClose={() => this.clearErrorAt(i)}
                                   message={err.message}
                                   offset={i*3} />
                    ) : null
                }
            </div>
        )
    }
}

export default App