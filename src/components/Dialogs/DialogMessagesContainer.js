import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import { ScrollContainer } from 'scrollmonitor-react';

import DialogMessage from './DialogMessage';
import { nextTick } from '../../utils';



const scrollToTopPosition = (topPosition, parent, delay) => {
    $(parent).animate({
        scrollTop: topPosition
    }, delay);
}

const getTopPosition = el => $(el).offset().top;

let previousRoute = "";

@inject('messagesStore')
@withRouter
@observer
class DialogMessagesContainer extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            viewportHeight: document.documentElement.clientHeight - 400,
            selectedMessages: [],
            afterDeletion: false,
            loadingPrevious: false,
            allowedToLoadPrevious: true,
            offset: 0,   // for pagination
            limit: 50,    // for pagination
        }

        this.dialogMessagesContainerRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        previousRoute = this.props.location.pathname;
    }

    componentDidMount() {
        // TODO think about responsiveness and number of messages in the message box
        window.onresize = e => {
            this.setState({
                ...this.state,
                viewportHeight: document.documentElement.clientHeight - 250
            });
        }

        if (
            this.props.messagesStore.chat.messages.length === 0
            || previousRoute !== this.props.location.pathname
        ) {

            console.log('DialogMessagesContainer.js [componentDidMount]: WE ARE LOADING NEW MESSAGES!!!')

            this.loadMessages()
              .then(() => {
                  nextTick(() => {
                      this.scrollSmoothToBottom();
                  });
              });
        } else {
            this.scrollSmoothToBottom();
        }

        setTimeout(() => {
            this.props.messagesStore.setReadStatus(
                this.props.channel_id, this.props.subscriber_id
            ).then(() => {
                // call the state function passed from DialogsList???
                // make a reaction call ??
            });
        }, 2000);
    }

    componentWillUnmount() {
        window.onresize = undefined;
    }

    elementVisibleInViewport = watcher => {
        const { watchItem, isInViewport } = watcher;

        if (
            isInViewport && watchItem.attributes['data-id'].value < 5
        ) {

            if (this.state.allowedToLoadPrevious && !this.state.loadingPrevious) {
                console.group('Infinite Scroll');
                console.log('Coming to the end, should try to load more stuff!!!');
                console.log('Current offset is: ', this.state.offset);
                console.log('Setting next offset to: ', this.state.offset + this.state.limit);
                console.groupEnd();

                this.setState({
                    ...this.state,
                    loadingPrevious: true,
                    allowedToLoadPrevious: false,
                    offset: this.state.offset + this.state.limit
                });
            }

            // if loading is not currently performed and loading is allowed,
            // we should fire a loadMessages (or better loadPrevious) function with
            // newOffset = this.state.offset + this.state.limit 
            // and then this.setState({ offset: newOffset, isLoading: false }).
            // When loading begins, allowedLoadingPrevious should become false and
            // get true only after the loading finishes.
            // New messages should be appended to the beggining of the existing
            // messagesStore.messages array. data-id attributes for new messages
            // should be updated properly so that this function works as it should.
            // Maybe it is better to use message.id as a data-id attribute instead of map index?
            // However, we don't know the size of the ids across all the chats and we won't be
            // able to track them properly. So, we better use indexes of map, but we'll
            // need to check how the array gets re-rendered every time it is appended with new data.


            // Sometime after loading (when promise gets resolved):
            // this.setState({
            //     ...this.state,
            //     loadingPrevious: false,
            //     allowedToLoadPrevious: true
            // });
        }
    }

    loadMessages = () => {
        return this.props.messagesStore.getMessages(
            this.props.channel_id, this.props.subscriber_id,
            this.state.offset, this.state.limit /* offset and limit from state */
        ); /* .then( ... update the state (limits offsets etc) on load   ) */
    }

    // this function is for usage with VisibilitySensor and infinite scroll (with offsets and limits)
    loadPrevious = isVisible => {
        if (!isVisible || !this.state.allowedToLoadPrevious || this.state.loadingPrevious) return;

        const firstMessage = document.querySelectorAll('#timeline-scroll .timeline-wrapper')[0];
        const oldFirstMessageTopPosition = getTopPosition(firstMessage);

        this.setState({
            ...this.state,
            loadingPrevious: true
        });

        return this.loadMessages()
            .then(() => {
                nextTick(() => {
                    const messages = document.querySelector('#timeline-scroll');
                    const newFirstMessageTopPosition = getTopPosition(firstMessage);
                    const delay = 0;

                    if (firstMessage) {
                        scrollToTopPosition(
                            newFirstMessageTopPosition - oldFirstMessageTopPosition, messages, delay
                        );
                    }

                    this.setState({
                        ...this.state,
                        loadingPrevious: false
                    });
                });
            });
    }

    scrollSmoothToBottom = () => {
        const div = this.dialogMessagesContainerRef.current

        if (div) {
            console.log('Scrolling to bottom in DialogMessagesContainer');
            $('#timeline-scroll.timeline').animate({
                scrollTop: div.scrollHeight * 999
            }, 1);
        }
    }

    onSelectMessage = (message, shouldAdd) => {
        let selectedMessages = this.state.selectedMessages;

        if (shouldAdd) {
            selectedMessages = [...selectedMessages, message];
        } else {
            selectedMessages = selectedMessages.filter(msg =>
                msg.message_id !== message.message_id
            );
        }

        this.setState({
            ...this.state,
            selectedMessages
        });
    }

    onDeleteMessages = () => {
        this.state.selectedMessages.forEach(message => {
            this.props.messagesStore.deleteMessage(
                message.channel_id, message.user_id, message.message_id
            );
        });

        this.setState({
            ...this.state,
            selectedMessages: [],
            afterDeletion: true
        });
    }

    render() {
        // let scrollHeight = this.dialogMessagesContainerRef.current.scrollHeight;

        if (this.state.selectedMessages === 0) {
            this.scrollSmoothToBottom();
        }

        const messages = this.props.messagesStore.chat.messages;

        const dialogItems = messages.map((message, index) => (
            <DialogMessage
                {...message}
                id={index}
                key={message.message_id + "-" + index}
                afterDeletion={this.state.afterDeletion}
                onSelect={(shouldAdd) => { this.onSelectMessage(message, shouldAdd) }}
                stateChange={this.elementVisibleInViewport}
                scrollContainer={this.props.scrollContainer}
            />
        ));

        return (
            <React.Fragment>
                <div
                    id="timeline-scroll"
                    className="timeline"
                    style={{
                        overflowY: "scroll",
                        height: this.props.isMobile
                                ? (this.state.viewportHeight * 2.5) + "px"
                                : this.state.viewportHeight + "px"
                    }}
                    ref={this.dialogMessagesContainerRef}
                >
                    {
                        dialogItems.length > 0
                        ? dialogItems
                        : this.props.messagesStore.inProgress
                        ? <p className="mx-auto mt-4 text-muted">Загрузка...</p>
                        : <p className="mx-auto mt-4 text-muted">Пусто...</p>
                    }
                    <div ref={this.props.forwardedRef} />
                </div>
                <button
                    onClick={this.scrollSmoothToBottom}
                    className="btn btn-icon btn-rounded btn-inverse-info"
                    style={{
                        position: 'absolute',
                        zIndex: 999,
                        opacity: 0.6,
                        margin: '-3rem 2rem 0 1rem'
                    }}
                >
                    <i className="mdi mdi-arrow-down" />
                </button>
                {
                    this.state.selectedMessages.length > 0 &&
                    <button
                        className={`btn btn-md btn-inverse-info btn-fw mb-2 ${this.props.isMobile ? "ml-1" : ""}`}
                        onClick={this.onDeleteMessages}
                    >
                        {`Удалить ${this.state.selectedMessages.length} сообщений`}
                    </button>
                }
            </React.Fragment>
        );
    }
}

DialogMessagesContainer = ScrollContainer(DialogMessagesContainer);

export default React.forwardRef(
    (props, ref) => <DialogMessagesContainer {...props} forwardedRef={ref}/>
);
