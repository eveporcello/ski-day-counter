import { SkiDayCount } from './ski-days'
import '../../stylesheets/App.scss'

const App = () =>
    <div className="app">
        <SkiDayCount total={10}
                     powder={3}
                     backcountry={4} />
    </div>

export default App