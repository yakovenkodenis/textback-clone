import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';


@withRouter
export default class RightSidebarItem extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            active: false
        };
    }

    goToRoute = e => {
        this.props.history.push('/');
    }

    render() {
        // const { chat } = this.props;

        return (
            <li
                className={`list ${ this.state.active ? "active" : ""}`}
                onClick={this.goToRoute}
                style={{cursor: "pointer"}}
                onMouseEnter={() => { this.setState({ active: true }); }}
                onMouseLeave={() => { this.setState({ active: false }); }}
            >
                <div className="profile">
                    <Avatar name="Thomas Douglas" round={true} size={50}/>
                    <span className="online"></span>
                </div>
                <div className="info">
                    <p>Thomas Douglas</p>
                    <p>Available</p>
                </div>
                <small className="text-muted my-auto">19 min</small>
            </li>
        );
    }
}
