import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import TimelineItem from './TimelineItem';


@withRouter
@observer
export default class Timeline extends Component {
    render() {

        const items = [
            { isInverted: false, heading: 'Hello world!', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', likesNumber: 5, date: '11 Oct 2018' },
            { isInverted: true, heading: 'Hey there', body: 'Lorem ipsum sit amet.', likesNumber: 15, date: '16 Oct 2018' },
            { isInverted: false, heading: 'Another message!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 51, date: '18 Oct 2018' },
            { isInverted: true, heading: 'Hey Ho!', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, molestiae. Eaque praesentium expedita cupiditate amet?', likesNumber: 0, date: '22 Oct 2018' },
            { isInverted: false, heading: 'Hello world!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 5, date: '11 Oct 2018' },
            { isInverted: true, heading: 'Hey there', body: 'Lorem ipsum sit amet.', likesNumber: 15, date: '16 Oct 2018' },
            { isInverted: false, heading: 'Another message!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 51, date: '18 Oct 2018' },
            { isInverted: true, heading: 'Hey Ho!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 0, date: '22 Oct 2018' },
            { isInverted: false, heading: 'Hello world!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 5, date: '11 Oct 2018' },
            { isInverted: true, heading: 'Hey there', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum tempore ea nemo! Dolores.', likesNumber: 15, date: '16 Oct 2018' },
            { isInverted: false, heading: 'Another message!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 51, date: '18 Oct 2018' },
            { isInverted: true, heading: 'Hey Ho!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 0, date: '22 Oct 2018' },
            { isInverted: false, heading: 'Hello world!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 5, date: '11 Oct 2018' },
            { isInverted: true, heading: 'Hey there', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, cupiditate eveniet.', likesNumber: 15, date: '16 Oct 2018' },
            { isInverted: false, heading: 'Another message!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 51, date: '18 Oct 2018' },
            { isInverted: true, heading: 'Hey Ho!', body: 'Lorem ipsum dolor sit amet.', likesNumber: 0, date: '22 Oct 2018' }
        ];

        const timelineItems = items.map((item, index) => (
            <TimelineItem {...item} key={index} />
        ));

        return (
            <div
                className="timeline"
                style={{overflowY: "scroll", height: (document.documentElement.clientHeight - 250) + "px"}}
            >
                {timelineItems}
            </div>
        );
    }
}
