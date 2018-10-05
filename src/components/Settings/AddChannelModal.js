import React, { Component } from 'react';
import { inject } from 'mobx-react';

import '../Newsletter/New/AddButtonsModalStyles.css';


@inject('commonStore', 'channelsStore')
export default class AddChannelModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showBotIdField: true,
            socialNetwork: 'telegram',
            botIdModalValue: '',

            vkAuthSuccessful: false,
            vkGroups: [],
            vkGroupsToken: '',
            vkAccessToken: null,
            chosenVkGroup: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.vkGroups && this.props.vkGroups.length > 0 && !this.state.chosenVkGroup) {
            this.setState({
                ...this.state,
                chosenVkGroup: this.props.vkGroups[0].id
            });
        }

        if (this.props.commonStore.accessTokens['auth_vk']) {
            this.setState({
                ...this.state,
                vkAuthSuccessful: true,
                vkAccessToken: this.props.commonStore.accessTokens['auth_vk']
            }, () => {
                this.props.commonStore.resetAccessToken('auth_vk');
            });
        }
    }

    onDeleteChannel = (channelType, channelId) => {
        console.log('onDeleteChannel:', channelType, channelId);

        this.props.channelsStore.deleteChannel(channelType, channelId)
            .then(() => this.props.channelsStore.getChannelsList());
    }

    onAddChannel = () => {
        this.props.channelsStore.addChannel(
            this.socialNetworkModalValue.current.value,
            this.botIdModalValue.current.value
        );
    }

    handleAddChannel = () => {
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
                this.state.socialNetwork,
                this.state.botIdModalValue
            );
        }
    }

    handleBotIdChange = e => {
        this.setState({
            ...this.state,
            botIdModalValue: e.target.value
        });
    }

    handleOnSocialNetworkChange = e => {
        if (e.target.value === 'vk') {
            this.setState({
                ...this.state,
                socialNetwork: 'vk',
                showBotIdField: false
            }, () => {

            });
        } else {
            this.setState({
                ...this.state,
                socialNetwork: e.target.value,
                showBotIdField: true
            });
        }
    }

    handleOnVkGroupSelect = e => {
        console.log('CHOSEN VK GROUP: ', e.target.value);

        this.setState({
            ...this.state,
            chosenVkGroup: e.target.value  
        });
    }

    closeModal = () => {
        this.props.close();
    }

    render() {

        const { isMobile, authHref,  } = this.props;

        const modalStyle = {
            display: this.props.isOpen ? 'block' : 'none'
        }

        const modalWidthStyle = {
            width: isMobile ? '100%' : '50%'
        }

        return (
            <div
                id="add-buttons-modal-popup-id"
                className={`add-buttons-modal-popup`}
                style={modalStyle}
            >

                <div
                    className={`add-buttons-modal-popup-content`}
                    id="add-buttons-modal-popup-content-id"
                    style={modalWidthStyle}
                >
                    <div
                        className="add-buttons-modal-popup-header"
                    >
                        <span
                            onClick={this.closeModal}
                            className="add-buttons-modal-popup-close"
                        >
                                &times;
                        </span>
                        <h3 className="mt-4">
                            Подключить новый канал
                        </h3>
                    </div>
                    <div className="add-buttons-modal-popup-body">
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
                        <React.Fragment>
                        <div className="form-group">
                            <label htmlFor="socialNetwork" className="col-form-label">Соц. сеть:</label>
                            <select
                                className="form-control" id="socialNetwork"
                                onChange={this.handleOnSocialNetworkChange}
                            >
                                <option value="telegram">Telegram</option>
                                <option value="viber">Viber</option>
                                <option value="vk">VK</option>
                                <option value="instagram">Instagram</option>
                                <option value="facebook">Facebook</option>
                            </select>
                        </div>
                        
                        {
                            this.state.showBotIdField ? (
                                <div className="form-group">
                                    <label htmlFor="botId" className="col-form-label">ID бота:</label>
                                    <input
                                        type="text" className="form-control" id="botId"
                                        value={this.state.botIdModalValue}
                                        onChange={this.handleBotIdChange}
                                        placeholder={`Вставьте сюда ID своего ${this.state.socialNetwork} бота...`}
                                    />
                                </div>
                            ) : (
                                !this.state.vkAuthSuccessful &&
                                <a className="btn btn-lg btn-info" href={authHref}>
                                    Авторизация ВК
                                </a>
                            )
                        }       
                        </React.Fragment>
                        )
                    }
                    </div>
                    <div className="add-buttons-modal-popup-footer my-2">
                        {
                            this.state.showBotIdField && (
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
                                        onClick={this.handleAddChannel}
                                    >
                                        Подключить
                                    </button>
                                )
                            )
                        }
                        {
                            this.state.showBotIdField &&
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={this.props.close}
                            >
                                Закрыть
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
