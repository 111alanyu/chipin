import React, { Component, Fragment } from "react";
import '../index.css'
import PropTypes from "prop-types";

class Autocomplete extends Component {
    // static propTypes = {
    //     suggestions: PropTypes.instanceOf(Array)
    // };

    // static defaultProps = {
    //     suggestions: []
    // };

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: "",
        };
    }

    onChange = e => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        const filteredSuggestions = suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value,
        });

        this.props.handleAutoComplete(filteredSuggestions)
    };




    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText,
        });
    };

    onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion],
            });
        }
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) return;
            this.setState({
                activeSuggestion: activeSuggestion - 1,
            });
        }
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) return;
            this.setState({
                activeSuggestion: activeSuggestion + 1,
            });
        }
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            if (index === activeSuggestion) className = "suggestion-active";

                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                )
            }
            else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>No suggestions available.</em>
                    </div>
                );
            }
        }

        return (
            <Fragment>
                <div>
                    <input
                        className="autocomplete-input"
                        type="text"
                        placeholder="Search for an event"
                        onChange={onChange}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        value={userInput}
                    />
                    <div>
                        {suggestionsListComponent}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Autocomplete