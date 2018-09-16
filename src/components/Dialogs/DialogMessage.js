import React, { Component } from 'react';
import { toImage } from 'emojione';
import Image from 'react-image-webp';
import { withRouter } from 'react-router-dom';
import { Watch } from 'scrollmonitor-react';

import { unixtimeToDate, formatDate, linkify } from '../../utils';


@withRouter
export default Watch(class DialogMessage extends Component {

    state = {
        hover: false,
        selected: false
    }

    hover = e => {
        this.setState({
            ...this.state,
            hover: true
        });
    }

    unhover = e => {
        this.setState({
            ...this.state,
            hover: false
        });
    }

    onSelect = e => {
        if (e.target.tagName && e.target.tagName.toLowerCase() !== 'a') {
            this.props.onSelect(!this.state.selected);

            this.setState({
                ...this.state,
                selected: !this.state.selected
            });
        }
    }

    render() {

        const {
            owner,
            text,
            is_attachment,
            files,
            date,
            afterDeletion,
            keyboard
        } = this.props;

        const messageDate = formatDate(unixtimeToDate(date));

        const isImage = is_attachment && files && files.length > 0 && files[0].type === 'photo';
        const isSticker = is_attachment && files && files.length > 0 && files[0].type ==='sticker';
        const isPNGsticker = isSticker && files[0].url && files[0].url.endsWith(".png");
        const hasKeyboard = keyboard && keyboard.constructor === Array && keyboard.length > 0;

        const imageStyles = {
            height: '80%',
            width: '80%',
            objectFit: 'obtain'
        };

        const stickerStyles = {
            height: '45%',
            width: '45%',
            objectFit: 'obtain'
        };

        const styles = owner
          ? {
              paddingLeft: '0px'
          } : {
              paddingRight: '0px'
          };

        const btnStyles = {
            opacity: this.state.hover ? 0.7 : 0.2,
            transform: 'scale(0.65, 0.65)'
        }

        let timelinePanelStyles = {};
        if (isSticker) timelinePanelStyles = {...timelinePanelStyles, boxShadow: "none"};
        if (afterDeletion) timelinePanelStyles = {...timelinePanelStyles, background: "#fff"};


        let messageContent = (
            isPNGsticker
            ? (
                <img
                    src={files[0].url}
                    alt={files[0].file_name + " png-sticker"}
                    className="image-tile"
                    style={stickerStyles}
                />
            ) : isSticker
            ? (
                <Image
                    webp={files[0].url}
                    className="image-tile"
                    style={stickerStyles}
                />
            ) : isImage ? ( 
                files.map((file, index) =>
                    <img
                        src={file.url}
                        alt={file.file_name}
                        className="image-tile my-1"
                        style={imageStyles}
                        key={index}
                    />
                )
            ) : (
                <React.Fragment>
                <p
                    className="convert-emoji"
                    dangerouslySetInnerHTML={{
                        __html: toImage(linkify(text))
                    }}
                />
                { hasKeyboard
                    && (
                        <div className="d-flex justify-content-center my-2">
                            {keyboard.map((button, index) => (
                                <a
                                href={button.url}
                                className="btn btn-inverse-primary btn-fw mx-2"
                                target="_blank"
                                key={index}
                            >
                                {button.text}
                            </a>
                            ))}
                        </div>
                    )
                }
                </React.Fragment>
            )
        )

        return (
            <div
                data-id={this.props.id}
                className={
                    `timeline-wrapper 
                     ${owner ? 'timeline-inverted' : ''} 
                     timeline-wrapper-success d-flex
                    `
                }
                style={{
                    ...styles,
                    cursor: 'pointer'
                }}
                onMouseEnter={this.hover}
                onMouseLeave={this.unhover}
                onClick={this.onSelect}
            >
                {owner &&
                    <button
                        className={
                            `
                                btn btn-sm btn-outline-secondary btn-rounded btn-icon my-auto
                                ${this.state.hover ? "btn-outline-secondary-hover" : ""}
                            `
                        }
                        style={btnStyles}
                    >
                        <i className="mdi mdi-check text-info"></i>
                    </button>
                }
                <div
                    className={`timeline-panel ${this.state.selected ? "background-selected" : ""}`}
                    style={timelinePanelStyles}
                >
                    <div className="timeline-body">
                        {messageContent}
                    </div>
                    <div className="timeline-footer d-flex align-items-right">
                        <span className="ml-auto text-muted">
                            {messageDate}
                        </span>
                    </div>
                </div>
                {!owner &&
                    <button
                        className={
                            `
                                btn btn-sm btn-outline-secondary btn-rounded btn-icon my-auto ml-5
                                ${this.state.hover ? "btn-outline-secondary-hover" : ""}
                            `
                        }
                        style={btnStyles}
                    >
                        <i className="mdi mdi-check text-info"></i>
                    </button>
                }
            </div>
        )
    }
});
