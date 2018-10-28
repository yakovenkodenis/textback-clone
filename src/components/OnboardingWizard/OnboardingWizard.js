import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import fetchJsonp from 'fetch-jsonp';

import ImagePicker from '../UiHelpers/ImagePicker/ImagePicker';
// import { Step, StepList } from '../UiHelpers/Stepper';
import { capitalize } from '../../utils';

import vkIcon from './social-network-logos/vk.png';
import tgIcon from './social-network-logos/telegram.png';
import fbIcon from './social-network-logos/messenger.png';
import vbIcon from './social-network-logos/viber.png';
import instIcon from './social-network-logos/instagram.png';

const networks = [
    { value: 'VK', src: vkIcon, png: vkIcon },
    { value: 'telegram', src: tgIcon, png: tgIcon },
    { value: 'viber', src: vbIcon, png: vbIcon },
    { value: 'instagram', src: instIcon, png: instIcon },
    { value: 'messenger', src: fbIcon, png: fbIcon },
]

@inject('channelsStore', 'commonStore')
@withRouter
@observer
export default class OnboardingWizard extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showBotIdField: true,

            vkAuthSuccessful: false,
            vkGroups: [],
            vkGroupsToken: '',
            vkAccessToken: null,

            currentNetwork: null
        }
    }

    componentDidMount() {
        const [, param] = this.props.match.url.split('?')
        console.log('HASH PARAM: ', param);
        // if (param) {
        //     this.setState({
        //         ...this.state,
        //         isModalOpen: true
        //     }, () => {
        //         // do stuff
        //     });
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.commonStore.accessTokens['auth_vk']) {
            this.setState({
                ...this.state,
                vkAuthSuccessful: true,
                vkAccessToken: this.props.commonStore.accessTokens['auth_vk'],
                isModalOpen: true
            }, () => {
                const url = `https://api.vk.com/method/groups.get?fields=name&extended=1&filter=admin&access_token=${this.state.vkAccessToken}&v=5.8`;

                fetchJsonp(url)
                  .then(response => response.json())
                  .then(json => {
                        console.log('parsed json', json);
                        this.setState({
                            ...this.state,
                            vkGroups: json.response && json.response.count > 0
                                      ? json.response.items
                                      : []
                        });
                  }).catch(ex => {
                        console.log('parsing failed', ex);

                        this.setState({
                            ...this.state,
                            vkGroups: []
                        });
                  });
            });
        }
    }

    onDeleteChannel = (channelType, channelId) => {
        console.log('onDeleteChannel:', channelType, channelId);

        this.props.channelsStore.deleteChannel(channelType, channelId)
            .then(() => this.props.channelsStore.getChannelsList());
    }

    onAddChannel = () => {
        console.log('ADDING CHANNEL: ', this.state);
        if (this.state.chosenVkGroup !== '') {

            // const redirect_uri = 'https://localhost:3000/oauth';
            const redirect_uri = 'https://mochaccino.herokuapp.com/oauth';
            const vkGroupUrl = `https://oauth.vk.com/authorize?client_id=6668833&display=popup&redirect_uri=${redirect_uri}&scope=messages,photos,docs,manage&group_ids=${this.state.chosenVkGroup}&response_type=token&state=auth_vk&v=5.80`;
            this.setState({
                ...this.state,
                vkGroupUrl
            });

        } else {
            this.props.channelsStore.addChannel(
                this.state.currentNetwork.toLowerCase(),
                this.state.botId
            );
        }
    }

    handleOnSocialNetworkChange = e => {
        if (e.target.value === 'vk') {
            this.setState({
                ...this.state,
                showBotIdField: false
            }, () => {

            });
        }
    }

    onNetworkPick = network => {
        this.setState({
            ...this.state,
            currentNetwork: network.value,
            showBotIdField: network.value !== 'VK'
        });
    }

    render() {
        const redirectUri = 'https://mochaccino.herokuapp.com/oauth/onboarding';
        const clientId = '6668833';
        const authHref = `https://oauth.vk.com/authorize?client_id=${clientId}&display=popup&redirect_uri=${redirectUri}&scope=groups&response_type=token&state=auth_vk&v=5.80`;


        return (
            <div className="text-center">
                <h1>Начало работы</h1>

                <div
                    className="add-buttons-modal-popup-header"
                >
                    <h3 className="mt-4">
                    Подключите мессенджер
                    </h3>
                </div>

                <div className="my-3">
                    <ImagePicker
                        images={networks} multiple={false}
                        onPick={this.onNetworkPick}
                        width={75}
                        height={75}
                        wrapperClass="d-flex justify-content-center"
                    />
                </div>

                {
                    this.state.currentNetwork && 
                    <h4>{capitalize(this.state.currentNetwork)}</h4>
                }

                {
                    this.props.vkGroups && this.props.vkGroups.length > 0
                    ? (
                        <div className="form-group">
                            <label htmlFor="socialNetwork" className="col-form-label">Выберите группу из списка:</label>
                            <select
                                className="form-control" id="socialNetwork"
                                onChange={this.handleOnVkGroupSelect}
                                value={this.state.chosenVkGroup}
                            >
                                {
                                    this.props.vkGroups.map(({ id, name }) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    ) : (                  
                        this.state.showBotIdField && this.state.currentNetwork ? (
                            <div className="form-group">
                                <label htmlFor="botId" className="col-form-label">ID бота:</label>
                                <input
                                    type="text" className="form-control" id="botId"
                                    value={this.state.botId}
                                    onChange={this.handleBotIdChange}
                                    placeholder={`Вставьте сюда ID своего ${this.state.currentNetwork} бота...`}
                                />
                            </div>
                        ) : (
                            !this.state.vkAuthSuccessful && this.state.currentNetwork &&
                            <a className="btn btn-lg btn-info" href={authHref}>
                                Авторизация ВК
                            </a>
                        )    
                    )
                }

                {
                    this.state.showBotIdField && this.state.currentNetwork && (
                        this.state.vkGroupUrl && this.state.vkGroupUrl !== ''
                        ? (
                            <a
                                className={`btn btn-gradient-success mr-2`}
                                href={this.state.vkGroupUrl}
                            >
                                Подключить
                            </a>
                        ) : (
                            <button
                                className={`btn btn-gradient-success mr-2`}
                                type="button"
                                onClick={this.onAddChannel}
                            >
                                Подключить
                            </button>
                        )
                    )
                }
            </div>
        )
    }
}
