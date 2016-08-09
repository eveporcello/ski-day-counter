import { Component } from 'react'
import { SkiDayList, SkiDayCount } from './ski-days'
import { Menu } from './navigation'
import '../../stylesheets/App.scss'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            skiDays: [
                {
                    resort: "Squaw Valley",
                    date: new Date("1/2/2016"),
                    powder: true,
                    backcountry: false
                },
                {
                    resort: "Mt Tallac",
                    date: new Date("3/28/2016"),
                    powder: false,
                    backcountry: true
                },
                {
                    resort: "Kirkwood",
                    date: new Date("4/2/2016"),
                    powder: false,
                    backcountry: false
                }
            ],
            currentScreen: "home"
        }
        this.goToScreen = this.goToScreen.bind(this)
    }

    countDays(days=[], filter) {
        return days.filter(day=> (filter) ? day[filter] : day).length
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
                <Menu selected={currentScreen} onNav={this.goToScreen} />
                {(currentScreen !== 'home') ?
                    <SkiDayList days={skiDays} /> :
                    <SkiDayCount total={totalDays}
                                 powder={powderDays}
                                 backcountry={backcountryDays} />

                }
            </div>
        )
    }
}

export default App