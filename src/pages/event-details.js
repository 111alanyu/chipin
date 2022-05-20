import React from 'react'

export default class EventDetails extends React.Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
        console.log("continued");
    }
    render() {
        const { values, handleChange } = this.props;
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Enter Event Details</h1>
                <form className="event-flex">
                    <label>
                        Event Name:
                        <input
                            className="event-name"
                            type="text"
                            placeholder="Enter event name"
                            onChange={e => this.props.handleChange('event_name', e)}
                            required="true"
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            className="horiz-field"
                            type="date"
                            placeholder="Enter a Date"
                            onChange={e => this.props.handleChange('date', e)}
                            required="true"
                        />
                    </label>
                    <label>
                        Capacity:
                        <input
                            className="horiz-field"
                            type="text"
                            placeholder="Enter a Voluneer Capacity"
                            onChange={e => this.props.handleChange('capacity', e)}
                            required="true"
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            className="event-name"
                            type="text"
                            placeholder="Enter a Description"
                            onChange={e => this.props.handleChange('description', e)}
                            required="true"
                        />
                    </label>
                    <button onClick={this.continue}>Continue</button>
                </form>
            </div>
        )
    }
}