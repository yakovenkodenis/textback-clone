import React, { Component } from 'react';
import { toImage } from 'emojione';
import Image from 'react-image-webp';
import { withRouter } from 'react-router-dom';

import { unixtimeToDate, formatDate, linkify } from '../../utils';


@withRouter
export default class DialogMessage extends Component {
    render() {

        const {
            owner,
            text,
            is_attachment,
            files,
            date
        } = this.props;

        const messageDate = formatDate(unixtimeToDate(date));

        // TODO: 
        // make this to work with multiple images!!!
        const isImage = is_attachment && files && files[0].type === 'photo';

        const isSticker = is_attachment && files && files[0].type ==='sticker';

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

        return (
            <div className={
                `timeline-wrapper ${owner? 'timeline-inverted' : ''} timeline-wrapper-success`
            }>
                <div
                    className="timeline-panel"
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
            </div>
        )
    }
}
