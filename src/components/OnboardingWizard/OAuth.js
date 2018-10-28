import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


@inject('commonStore', 'channelsStore')
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
    // {expires_in: "0", access_token_148835776: "6af49e9dece7351b6fdddfbdfb23bd12998ae311906c3ca7ac1180538fb3bde56204e99c15bf35e9a92e6", state: "auth_vk"}
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

            if (oauthResponse.access_token) { // this is a vk auth response
                this.props.commonStore.setAccessTokenObject(oauthResponse);   
            } else { // this is a vk group auth response (maybe)

                const tokenKey = Object.keys(oauthResponse).filter(key => key.includes('access_token'));
                if (tokenKey && oauthResponse.state === 'auth_vk') {
                    console.log('FINALLY, this is a GROUP TOKEN: ', tokenKey);

                    this.props.channelsStore.addChannel('vk', oauthResponse[tokenKey])
                     .then(() => {
                        this.props.history.replace('/admin/dialogs/all');
                     });
                }

            }

            // SEND DATA TO THE SERVER HERE
        } catch(e) {
            this.setState({
                hash: undefined
            });
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
            <Redirect to={`/admin/dialogs/all`} />
        );
    }
}

export default OAuth;
