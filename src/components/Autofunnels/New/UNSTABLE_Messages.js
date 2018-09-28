import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import $ from 'jquery';
import { Motion, spring } from 'react-motion';

import MessageComposerModal from './MessageComposerModal';


const reinsert = (arr, from, to) => {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);

    console.log('Reinsert: ', arr, _arr, from, to);
    return _arr;
}

const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

const springConfig = {
    stiffness: 300,
    damping: 50
};

class Messages extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            isMessagesComposerModalOpen: false,
            activeMessageChain: 0,
            messages: [],

            topDeltaY: 0,
            mouseY: 0,
            isPressed: false,
            originalPosOfLastPressed: 0,
            order: []
        };
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip(); // initiate tooltips

        this.setState({
            ...this.state,
            order: [
                { time: 'Через 3 часа', active: true, name: 'Полезный контент' },
                { time: 'Через 2 часа', active: false, name: 'Ненавязчивая продажа' },
                { time: 'Через 4 часа', active: true, name: 'Сообщение #7' }
            ],
            messages: [
                { time: 'Через 3 часа', active: true, name: 'Полезный контент' },
                { time: 'Через 2 часа', active: false, name: 'Ненавязчивая продажа' },
                { time: 'Через 4 часа', active: true, name: 'Сообщение #7' }
            ]
        });

        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleTouchStart = (key, pressLocation, e) => {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    }

    handleTouchMove = e => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    }

    handleMouseDown = (pos, pressY, { pageY }) => {
        this.setState({
            ...this.state,
            topDeltaY: pageY - pressY,
            mouseY: pressY,
            isPressed: true,
            originalPosOfLastPressed: pos
        });
    }

    handleMouseMove = ({ pageY }) => {
        const {
            isPressed, topDeltaY, order,
            originalPosOfLastPressed
        } = this.state;

        if (isPressed) {
            const mouseY = pageY - topDeltaY;
            const currentRow = clamp(Math.round(mouseY / 100), 0, this.state.order.length - 1);
            let newOrder = order;

            if (currentRow !== order.indexOf(order[originalPosOfLastPressed])) {
                newOrder = reinsert(order, order.indexOf(order[originalPosOfLastPressed]), currentRow);
            }

            console.log('handleMouseMove', order, newOrder);

            this.setState({
                ...this.state,
                mouseY,
                order: newOrder
            });
        }
    }

    handleMouseUp = () => {
        this.setState({
            ...this.state,
            isPressed: false,
            topDeltaY: 0
        });
    }

    handleOnAddMessage = e => {

        const msg = { time: 'Через 3 часа', active: true, name: `Сообщение #${Math.random()}` };

        this.setState({
            ...this.state,
            order: [
                ...this.state.order,
                msg
            ]
        });
    }

    openMessagesModal = (index) => {
        this.setState({
            ...this.state,
            activeMessageChain: this.state.order[index],
            isMessagesComposerModalOpen: true
        });
    }

    closeMessagesModal = () => {
        this.setState({
            ...this.state,
            isMessagesComposerModalOpen: false
        });
    }

    getStylesForRow = (shadow, scale, y, zIndex) => ({
        boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
        transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
        WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
        zIndex
    });

    renderTableRow = (index, y, order, style) => {

        console.log('renderTableRow', index, order);

        return (
            <tr
                style={style}
            >
                <td><u>{order[index].time}</u></td>

                <td className="d-flex justify-content-start mb-1">
                    <div
                        className="form-check form-check-flat form-check-primary my-auto">
                        <label className="form-check-label my-auto">
                            <input
                                type="checkbox" className="form-check-input"
                                defaultChecked={order[index].active}
                            />
                            <i className="input-helper"></i>
                        </label>
                    </div>
                </td>

                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <i className="mdi mdi-drag-vertical"
                            style={{transform: 'scale(1.6)', cursor: 'pointer'}}
                            onMouseDown={this.handleMouseDown.bind(null, index, y)}
                            onTouchStart={this.handleTouchStart.bind(null, index, y)}
                        />
                    </div>
                </td>

                <td>{order[index].name}</td>
                <td>
                    <div className="col-12 d-flex justify-content-center">
                        <label
                            className="badge badge-outline-info my-auto mx-2"
                            style={{cursor: "pointer"}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Изменить"
                            onClick={() => { this.openMessagesModal(index); }}
                        >
                            <i className="mdi mdi-pencil-box-outline" />
                        </label>
                        <label
                            className="badge badge-danger my-auto mx-2"
                            style={{cursor: "pointer"}}
                            data-toggle="tooltip"
                            data-placement="top"
                            data-original-title="Удалить"
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
        const { mouseY, isPressed, originalPosOfLastPressed, order } = this.state;

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
                            this.state.messages.map((message, index) => {
                                const style = originalPosOfLastPressed === index && isPressed
                                ? {
                                    scale: spring(1.1, springConfig),
                                    shadow: spring(16, springConfig),
                                    y: mouseY
                                } : {
                                    scale: spring(1, springConfig),
                                    shadow: spring(1, springConfig),
                                    y: spring(order.indexOf(message) /* * 100*/, springConfig)
                                };

                                return (
                                    <Motion style={style} key={index}>
                                    {
                                        ({ scale, shadow, y }) =>
                                        this.renderTableRow(
                                            index, y, order,
                                            this.getStylesForRow(
                                                shadow, scale, y,
                                                index === originalPosOfLastPressed ? 99 : index
                                            )
                                        )
                                    }
                                    </Motion>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <MessageComposerModal
                isOpen={this.state.isMessagesComposerModalOpen}
                close={this.closeMessagesModal}
                isMobile={isMobile}
                messages={this.state.activeMessageChain}
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
