Ski Day Counter - Display the Ski Day Count
=================
Add the First Component, the Ski Day Count.

Topics
-------

* basic components
* stateless functional components
* propType validation
* defaultProps
* react-icons


Steps
-------

First Add The `<SkiDayCount />`

```javascript

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

```

Then test it out in the app component
```javascript

    import { SkiDayCount } from './ski-days'
    import '../../stylesheets/App.scss'
    
    const App = () =>
        <div className="app">
            <SkiDayCount total={10}
                         powder={3}
                         backcountry={4} />
        </div>
    
    export default App
```