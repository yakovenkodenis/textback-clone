import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import $ from 'jquery';
import shortid from 'shortid';

import MessageComposerModal from './MessageComposerModal';


const getDefaultMessage = id => ({
    title: 'Название сообщения',
    id,
    isActive: true,
    messages: [{
        message: {
            messageText: '',
            buttons: [] // [{name, url, id}, ...]
        },
        messageAttachments: [], // [{id, name, preview, progress}]
        messageId: 0,
        title: ''
    }],
    sendTime: {
        unit: 'hour',
        measure: 3
    }
});

class Messages extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isMessagesComposerModalOpen: false,
            activeChain: null,
            messagesChain: [getDefaultMessage(0)]
        };
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips

        this.setState({
            ...this.state,
            activeChain: this.state.messagesChain[0]
        }, () => {
            this.props.updateMessagesChainData(this.state.messagesChain);
        });
    }

    handleOnAddMessage = e => {
        const newId = shortid.generate();

        console.log('Current messages: ', this.state.messagesChain);

        this.setState({
            ...this.state,
            messagesChain: [
                ...this.state.messagesChain,
                getDefaultMessage(newId)
            ]
        }, () => {
            this.props.updateMessagesChainData(this.state.messagesChain);
        });
    }

    openMessagesModal = (id) => {
        this.setState({
            ...this.state,
            activeChain: this.getChainById(id),
            isMessagesComposerModalOpen: true
        });
    }

    closeMessagesModal = () => {
        this.setState({
            ...this.state,
            isMessagesComposerModalOpen: false
        });
    }

    getChainById = id => {
        const chains = this.state.messagesChain;
        const neededChainIndex = chains.findIndex(chain => chain.id === id);

        return neededChainIndex === -1 ? chains[0] : chains[neededChainIndex];
    }

    updateChainItem = (chain) => {
        const chains = this.state.messagesChain;
        let neededIndex = chains.findIndex(c => c.id === chain.id);
        neededIndex = neededIndex === -1 ? 0 : neededIndex;

        chains[neededIndex] = {
            ...chains[neededIndex],
            ...chain
        };

        console.log('updateChainItem', chain);

        this.setState({
            ...this.state,
            messagesChain: chains,
            isMessagesComposerModalOpen: false
        }, () => {
            this.props.updateMessagesChainData(this.state.messagesChain);
        });
    }

    handleIsChainActiveChange = id => {
        const chains = this.state.messagesChain;
        let neededChainIndex = chains.findIndex(chain => chain.id === id);
        neededChainIndex = neededChainIndex === -1 ? 0 : neededChainIndex;

        chains[neededChainIndex].isActive = !chains[neededChainIndex].isActive;

        this.setState({
            ...this.state,
            messagesChain: chains
        }, () => {
            this.props.updateMessagesChainData(this.state.messagesChain);
        });
    }

    renderTableRow = (chain) => {
        return (
            <tr key={chain.id}>
                <td><u>
                    {
                        chain.sendTime.specificSendTime
                        ? chain.sendTime.specificSendTime
                        : 'Через ' + chain.sendTime.measure + (
                            chain.sendTime.unit === 'hour'
                            ? ' часов'
                            : chain.sendTime.unit === 'minute'
                            ? ' минут'
                            : ' дней'
                        )
                    }
                </u></td>

                <td className="d-flex justify-content-center mb-1">
                    <div
                        className="form-check form-check-flat form-check-primary my-auto">
                        <label className="form-check-label my-auto">
                            <input
                                type="checkbox" className="form-check-input"
                                checked={chain.isActive}
                                onChange={() => { this.handleIsChainActiveChange(chain.id); }}
                            />
                            <i className="input-helper"></i>
                        </label>
                    </div>
                </td>

                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <i className="mdi mdi-drag-vertical"
                            style={{transform: 'scale(1.6)', cursor: 'pointer'}}
                        />
                    </div>
                </td>

                <td>{chain.title}</td>
                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <label
                            className="badge badge-outline-info my-auto mx-2"
                            style={{cursor: "pointer"}}
                            // data-toggle="tooltip"
                            // data-placement="top"
                            // data-original-title="Изменить"
                            onClick={() => { this.openMessagesModal(chain.id); }}
                        >
                            <i className="mdi mdi-pencil-box-outline" />
                        </label>
                        <label
                            className="badge badge-danger my-auto mx-2"
                            style={{cursor: "pointer"}}
                            // data-toggle="tooltip"
                            // data-placement="top"
                            // data-original-title="Удалить"
                            onClick={() => { this.deleteMessageChain(chain.id); }}
                        >
                            <i className="mdi mdi-delete-forever" />
                        </label>
                    </div>
                </td>
            </tr>
        );
    }

    render() {

        const { isMobile } = this.props;

        return (
        <React.Fragment>
            <div className="">
                <button
                    className="btn btn-gradient-primary btn-icon-text mb-3"
                    onClick={this.handleOnAddMessage}
                >
                    <i className="mdi mdi-plus btn-icon-prepend"></i>
                    Добавить сообщение
                </button>
                <br/>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Время</th>
                            <th>Активность</th>
                            <th></th>
                            <th>Название сообщения</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.messagesChain.map(chain => this.renderTableRow(chain))
                        }
                    </tbody>
                </table>
            </div>
            <MessageComposerModal
                isOpen={this.state.isMessagesComposerModalOpen}
                close={this.closeMessagesModal}
                isMobile={isMobile}
                activeChain={this.state.activeChain}
                updateChainItem={this.updateChainItem}
                key={this.state.activeChain ? this.state.activeChain.id : shortid.generate()}
            />
        </React.Fragment>
        )
    }
}

const ResponsiveMessages = props =>(
    <MediaQuery maxDeviceWidth={767}>
        {isMobile => (
            <Messages isMobile={isMobile} {...props} />
        )}
    </MediaQuery>
);

export default ResponsiveMessages;
