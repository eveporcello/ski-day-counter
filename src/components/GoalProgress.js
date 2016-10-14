import { Component, propTypes } from 'react'
import { equals } from 'ramda'

class GoalProgress extends Component {

    constructor({goal=100, current=0}) {
        super()
        this.state = {
            goal,
            progress: this.calcGoalProgress(current, goal)
        }
        this.newGoal = this.newGoal.bind(this)
        this.saveGoal = this.saveGoal.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.props.current) {
            this.setState({
                progress: this.calcGoalProgress(nextProps.current, this.props.goal) || 0
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !equals(nextState, this.state) || !equals(nextProps, this.props)
    }

    newGoal() {
        const goal = parseInt(this.refs._goalNumber.value)
        this.setState({
            goal,
            progress: this.calcGoalProgress(this.props.current, goal)
        })
    }

    saveGoal() {
        this.props.save(this.state.goal)
    }

    calcGoalProgress(total, goal) {
        return Math.floor((total / goal) * 100)
    }

    render() {

        const { goal, progress } = this.state,
            { current, goal: savedGoal, save } = this.props

        return (
            <div className="goal-setter">
                <progress value={current} max={goal}/>
                {progress}% complete!
                <input type="number"
                       ref="_goalNumber"
                       defaultValue={goal}
                       onChange={this.newGoal}/>
                {(save) ?
                    <button disabled={goal === savedGoal}
                            onClick={this.saveGoal}>save
                    </button> :
                    null
                }
            </div>
        )
    }

}

export default GoalProgress