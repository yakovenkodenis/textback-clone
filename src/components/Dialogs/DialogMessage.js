import React, { Component } from 'react';
import { toImage } from 'emojione';
import Image from 'react-image-webp';
import { withRouter } from 'react-router-dom';

import { unixtimeToDate, formatDate, linkify } from '../../utils';


@withRouter
export default class DialogMessage extends Component {

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
        this.setState({
            ...this.state,
            selected: !this.state.selected
        });
    }

    render() {

        const {
            owner,
            text,
            is_attachment,
            files,
            date
        } = this.props;

        const messageDate = formatDate(unixtimeToDate(date));

        const isImage = is_attachment && files && files.length > 0 && files[0].type === 'photo';

        const isSticker = is_attachment && files && files.length > 0 && files[0].type ==='sticker';

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

        return (
            <div
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
                    style={isSticker ? {boxShadow: "none"} : null}
                >
                    <div className="timeline-body">
                        {
                            isSticker
                            ? (
                                <Image
                                    webp={files[0].url}
                                    className="image-tile"
                                    style={stickerStyles}
                                />
                            ) : isImage ? (
                                <img
                                    src={files[0].url}
                                    alt={files[0].file_name}
                                    className="image-tile"
                                    style={imageStyles}
                                />
                            ) : (
                                <p
                                    className="convert-emoji"
                                    dangerouslySetInnerHTML={{
                                        __html: toImage(linkify(text))
                                    }}
                                />
                            )
                        }
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
}
