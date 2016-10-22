import { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'

class Autocomplete extends Component {

    set value(newValue) {
        this.refs.searchTerm.value = newValue
    }

    get value() {
        return this.refs.searchTerm.value
    }

    constructor(props) {

        super(props)

        this.state = {
            queries: [],
            cache: {},
            suggestions: [],
            fetching: false
        }

        this.changeSuggestions = this.changeSuggestions.bind(this)
        this.addQueryLetter = this.addQueryLetter.bind(this)
        this.cacheResponse = this.cacheResponse.bind(this)
        this.letterIsInCache = this.letterIsInCache.bind(this)
        this.suggest = this.suggest.bind(this)
        this.getSuggestion = this.getSuggestion.bind(this)
        this.selectItem = this.selectItem.bind(this)

    }

    changeSuggestions(suggestions) {
        this.setState({suggestions})
    }

    addQueryLetter(letter) {
        this.setState({
            queries: [
                ...this.state.queries,
                letter
            ].sort(),
            fetching: true
        })
    }

    cacheResponse(letter, terms) {
        this.setState({
            cache: {
                ...this.state.cache,
                [letter]: terms
            },
            fetching: false
        })
    }

    letterIsInCache(letter) {
        return this.state.queries.some(q => q === letter)
    }

    suggest(value) {
        const { cache } = this.state,
            first = value[0]
        if (value) {
            this.changeSuggestions(
                cache[first].filter(
                    term => value.toLowerCase() === term.substr(0, value.length).toLowerCase()
                )
            )
        } else {
            this.changeSuggestions([])
        }
    }

    getSuggestion() {

        const { letterIsInCache,
                addQueryLetter,
                cacheResponse,
                suggest,
                changeSuggestions } = this,
            { fetching } = this.state,
            firstLetter = this.value[0],
            { feed, onError } = this.props,
            url = feed + firstLetter

        if (this.value.length && !fetching) {
            if (letterIsInCache(firstLetter)) {
                suggest(this.value)
            } else {
                addQueryLetter(firstLetter)
                fetch(url)
                    .then(response => response.json())
                    .then(terms => cacheResponse(firstLetter, terms))
                    .then(() => suggest(this.value))
                    .catch(({message}) => onError(`Could not obtain suggestions from ${feed}`))
            }
        }
        else {
            changeSuggestions([])
        }
    }

    selectItem(item) {
        this.value = item
        this.setState({suggestions: []})
    }

    render() {

        const { suggestions } = this.state
        const { getSuggestion, selectItem, changeSuggestions } = this

        return (
            <div className="autocomplete">

                <input ref="searchTerm"
                       type="text"
                       list="suggestions"
                       placeholder="mountain or resort..."
                       onChange={getSuggestion}
                       onFocus={getSuggestion}
                       onBlur={() =>
                            setTimeout(() => changeSuggestions([]), 250)
                       }
                />

                <div className="suggestions">
                    {suggestions.map((item, i) =>
                        <p key={i} onClick={() => selectItem(item)}>{item}</p>
                    )}
                </div>

            </div>
        )
    }

}

Autocomplete.defaultProps = {
    onError: f=>f
}

Autocomplete.propTypes = {
    onError: PropTypes.func,
    feed: PropTypes.string.isRequired
}

export default Autocomplete