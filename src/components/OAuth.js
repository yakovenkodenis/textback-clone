import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


@inject('commonStore')
@withRouter
@observer
class OAuth extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hash: ""
        }
    }

    componentWillMount() {
        this.setState({
            hash: this.props.location.hash
        });
    }

    componentDidMount() {
        console.log('OAuth component did fire!');

        const hash = this.state.hash;
        console.log('OAUTH HASH:\n', hash);


        try {
            const oauthResponse = JSON.parse(
                '{"' + hash.substr(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}',
                (key, value) => key === "" ? value : decodeURIComponent(value)
            );

            console.log(oauthResponse);
            this.props.commonStore.setAccessTokenObject(oauthResponse);

            // SEND DATA TO THE SERVER HERE
        } catch(e) {
            this.setState({
                hash: undefined
            })
        }
    }

    render() {

        if (!this.props.commonStore.token) {
            return <Redirect to="/login" />;
        }

        const { hash } = this.state;

        if (!hash || hash === "" || hash === "#") {
            return <Redirect to="/" />;
        }

        return (
            <Redirect to="/admin/settings/channels?" />
        );
    }
}

export default OAuth;
