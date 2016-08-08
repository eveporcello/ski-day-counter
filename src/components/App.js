import { Component } from 'react'
import { SkiDayList, SkiDayCount, AddDay } from './ski-days'
import { Menu } from './navigation'
import '../../stylesheets/App.scss'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            skiDays: [],
            currentScreen: "home"
        }
        this.goToScreen = this.goToScreen.bind(this)
        this.addDay = this.addDay.bind(this)
    }

    countDays(days = [], filter) {
        return days.filter(day=> (filter) ? day[filter] : day).length
    }

    addDay(day) {
        const skiDays = [
            ...this.state.skiDays,
            day
        ].sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        )
        this.setState({
            skiDays,
            currentScreen: 'home'
        })
    }

    goToScreen(currentScreen) {
        this.setState({currentScreen})
    }

    render() {
        const { currentScreen, skiDays } = this.state,
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
            </div>
        )
    }
}

export default App