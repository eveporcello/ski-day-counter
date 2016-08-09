Ski Day Counter - List the Days
=================
Now we will create the day list component and map through an array

Topics
-------

* propValidation isRequied
* propValidation .instanceOf
* custom property validation
* JavaScript expressions and If/Else expressions
* mapping an array to components

Steps
-------

Create The `<SkiDayRow />` component

```javascript

    const SkiDayRow = ({ resort, date, powder, backcountry }) =>
        <tr>
            <td>
                {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
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
```

Create the `<SkiDayList />` component
```javascript
    
    export const SkiDayList = ({ days }) =>
        <div className="ski-day-list">
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Resort</th>
                    <th><SnowFlake /></th>
                    <th><Terrain /></th>
                </tr>
                </thead>
                <tbody>
                {days.map((day, i) =>
                    <SkiDayRow key={i} {...day} />
                )}
                </tbody>
            </table>
        </div>
    
    SkiDayList.propTypes = {
        days: (props) => (!Array.isArray(props.days)) ?
            new Error("SkiDayList days property must be an array") :
            (!props.days.length) ?
                new Error("SkiDayList days array must contain at least one record") :
                null
    }

```

Modify the app component to display a list of ski dates
```javascript

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
```