import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import AsyncSelect from 'react-select/lib/Async';
import makeAnimated from 'react-select/lib/animated';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import agent from '../../../agent';
import MessageComposerForm from '../../Newsletter/New/MessageComposerForm';


@inject('channelsStore')
@withRouter
@observer
export default class General extends Component {

    state = {
        pagesLinks: [],
        widgetCodeValue: '',
        widgetCodeCopied: false,
        tags: [],
        message: [],
        widgetName: 'Новый виджет'
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            widgetCodeValue: this.getWidgetCode()
        });

        this.props.channelsStore.getChannelsList()
         .then(() => {
            this.setState({
                ...this.state,
                pagesLinks: this.props.channelsStore.channels.map(channel => {
                    const socialNetwork =
                        channel.channel_type.toLowerCase() === 'facebook'
                        ? 'fb'
                        : channel.channel_type.toLowerCase();
                    const baseLink = `https://${socialNetwork}.me/`;
                    const pageLink = channel.username;
                    const isUsed = false;

                    return {
                        baseLink, pageLink, isUsed
                    }
                })
            })
         });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.saveWidget) {
            this.props.saveWidget({
                pagesLinks: this.state.pagesLinks.filter(link => link.isUsed),
                tags: this.state.tags.map(tag => parseInt(tag.value, 10)),
                message: this.state.message,
                widgetName: this.state.widgetName
            });
        }
    }

    loadTags = () => {
        return new Promise(resolve => {
            agent.Tags.getTagsList()
            .then(tags => {
                if (tags.success) {
                    resolve(tags.data.map(tag => ({
                        label: tag.description, value: tag.tag_id.toString()
                    })));
                } else resolve([]);
            });
        });
    }

    handleSelectChangeForInTags = (tags) => {
        this.setState({
            ...this.state,
            tags
        });
    }

    onWidgetNameChange = e => {
        this.setState({
            ...this.state,
            widgetName: e.target.value
        });
    }

    getMessageState = message => {
        this.setState({
            ...this.state,
            message
        });
    }

    onPageLinkChange = (e, pageLink) => {
        const pagesLinks = this.state.pagesLinks;
        pagesLinks.forEach(link => {
            if (link.pageLink === pageLink.pageLink && link.baseLink === pageLink.baseLink) {
                link.isUsed = !link.isUsed;
            }
        });

        this.setState({
            ...this.state,
            pagesLinks
        }, () => {
            if (this.props.saveLinks) {
                this.props.saveLinks(this.state.pagesLinks.filter(link => link.isUsed));
            }
        });
    }

    generatePagesLinksRows = (links) => {
        return links.map((link, index) => (
            <tr key={index}>
                <td>{link.baseLink}</td>
                <td>{link.pageLink}</td>
                <td>
                    <div className="form-check form-check-flat form-check-primary m-0 pb-3">
                        <label className="form-check-label text-muted">
                            <input 
                                type="checkbox"
                                className="form-check-input"
                                defaultChecked={link.isUsed}
                                onChange={e => this.onPageLinkChange(e, link)}
                            />
                            <i className="input-helper"></i>
                        </label>
                    </div>
                </td>
            </tr>
        ));
    }

    getWidgetCode = () => {
        return `<script src="//unpckg.com/@zangerange/notification-widget@latest/build/index.js"></script>`
            + `<notification-widget></notification-widget>`;
    }

    render() {

        const { isMobile } = this.props;

        const pagesLinksRows = this.generatePagesLinksRows(
            this.state.pagesLinks ? this.state.pagesLinks : []
        );

        const widgetCode = this.getWidgetCode();

        return (
            <React.Fragment>

            <div className="card">
                <div className="card-body pt-1">

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Название виджета"
                            className="form-control form-control-lg"
                            id="widgetName"
                            value={this.state.widgetName}
                            onChange={this.onWidgetNameChange}
                        />
                    </div>
                    <br/>
                    <p className="card-description">
                        Скопируйте код виджета и установите на сайт перед закрывающим тегом <span className="font-weight-bold">{"</body>"}</span> на всех страницах, где он должен отображаться.
                    </p>
                    <blockquote
                        className="blockquote"
                        style={{
                            backgroundColor: "#f5f5f5"
                        }}
                    >
                        <code
                            className="mb-0 text-left"
                        >
                            {widgetCode}
                        </code>
                    </blockquote>
                    <CopyToClipboard
                        text={this.state.widgetCodeValue}
                        onCopy={() => this.setState({
                            ...this.state,
                            widgetCodeCopied: true
                        })}
                    >
                        <button
                            className={`btn btn-light btn-icon-text ${isMobile ? "w-100 mb-1" : "ml-1"}`}
                            type="button"
                        >
                            {
                                this.state.widgetCodeCopied
                                ? (
                                    <React.Fragment>
                                        <i className="mdi mdi-check-all mr-2"></i>
                                        Скопировано
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <i className="mdi mdi-content-copy mr-2"></i>
                                        Скопировать в буфер
                                    </React.Fragment>
                                )
                            }
                        </button>
                    </CopyToClipboard>
                </div>
            </div>

            <div className="card">
                <div className="card-body col-6 pt-1">
                    <h4 className="text-primary">Ссылки на ваши страницы</h4>
                    <table className="table table-hover">
                        <thead><tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr></thead>
                        <tbody>
                            {pagesLinksRows}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card">
                <div className="card-body pb-0 pt-1">
                    <h4 className="text-primary">Теги, навешиваемые после успешной подписки</h4>
                    <br/>
                    <AsyncSelect
                        styles={{container: base => ({...base, zIndex: 999})}}
                        closeMenuOnSelect={false}
                        components={makeAnimated()}
                        isMulti
                        cacheOptions
                        defaultOptions
                        placeholder="Выбрать теги"
                        loadingMessage={() => "Загрузка..."}
                        loadOptions={this.loadTags}
                        onChange={this.handleSelectChangeForInTags}
                        noOptionsMessage={() => "Нет тегов"}
                    />
                </div>
            </div>

            <MessageComposerForm
                title="Сообщение после успешной подписки"
                isMobile={isMobile}
                onStateChange={this.getMessageState}
                disableMarginBottom
                disablePaddingBottom
                withoutSelfSending
            />
            </React.Fragment>
        )
    }
}
