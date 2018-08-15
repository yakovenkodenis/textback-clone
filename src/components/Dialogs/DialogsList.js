import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import DialogListItem from './DialogListItem';


@withRouter
@observer
export default class DialogsList extends Component {

    render() {

        const dialogs = [
            { name: "Екатерина Петрова", timeAgo: "9:04 PM", bodyPreview: "Lorem ipsum dolor sit..." },
            { name: "Иван Петров", timeAgo: "6:17 PM", bodyPreview: "Lorem ipsum dolor sit..." },
            { name: "Николай Алексеев", timeAgo: "11:11 AM", bodyPreview: "Lorem ipsum dolor sit..." },
            { name: "Владимир Куш", timeAgo: "11:21 PM", bodyPreview: "Lorem ipsum dolor sit..." },
            { name: "Жанна Васильева", timeAgo: "8/2/18", bodyPreview: "Lorem ipsum dolor sit..." },
            { name: "Константин Ветров", timeAgo: "10:27 PM", bodyPreview: "Lorem ipsum dolor sit..." },
            { name: "Роман Григорьев", timeAgo: "6:17 PM", bodyPreview: "Lorem ipsum dolor sit..." }
        ].map(dialog => <DialogListItem {...dialog} />)

        return (
            <div className="list-group">
                {dialogs}                                               
            </div>
        );
    }
}