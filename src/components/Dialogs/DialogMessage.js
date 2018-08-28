import React, { Component } from 'react';
import { toImage } from 'emojione';
import Image from 'react-image-webp';

import { unixtimeToDate, formatDate } from '../../utils';


export default class DialogMessage extends Component {
    render() {

        const {
            owner,
            text,
            is_attachment,
            file,
            date
        } = this.props;

        const messageDate = formatDate(unixtimeToDate(date));

        const isImage = is_attachment && file && file.type === 'photo';
        const isSticker = is_attachment && file && file.type ==='sticker';

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
                                    webp={file.url}
                                    className="image-tile"
                                    style={stickerStyles}
                                />
                            ) : isImage ? (
                                <img
                                    src={file.url}
                                    alt={file.file_name}
                                    className="image-tile"
                                    style={imageStyles}
                                />
                            ) : (
                                <p
                                    className="convert-emoji"
                                    dangerouslySetInnerHTML={{
                                        __html: toImage(text)
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
