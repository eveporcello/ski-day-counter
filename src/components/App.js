import { SkiDayList } from './ski-days'
import '../../stylesheets/App.scss'

const App = () =>
    <div className="app">
        <SkiDayList days={[
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
        ]} />
    </div>

export default App