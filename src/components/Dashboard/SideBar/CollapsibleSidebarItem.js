import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import shortid from 'shortid';


@withRouter
@observer
export default class CollapsibleSidebarItem extends Component {

    @observable isCollapsed = false;

    handleOnClick = () => {
        action(() => {
            this.isCollapsed = !this.isCollapsed;
        })();
    }

    toggleActive = () => {
        this.props.toggleActive(this.props.itemName);
    }

    render() {
        const {
            itemName,
            iconClassName,
            routes,
            location
        } = this.props;

        const isActive = routes.some(el => new RegExp(el.route).test(location.pathname));

        const subItems = routes.map((route) => (
            <li className='nav-item' key={shortid.generate()}>
                <Link to={route.route} className='nav-link'>
                    {route.name}
                </Link>
            </li>
        ));

        return (
            <li
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={this.handleOnClick}
                style={{cursor: 'pointer'}}>
                <a
                    className={`nav-link ${this.isCollapsed ? 'collapsed' : ''}`}
                    data-toggle="collapse"
                    aria-expanded={this.isCollapsed}
                    aria-controls="ui-basic">
                    <span className="menu-title">{itemName}</span>
                    <i className="menu-arrow"></i>
                    <i className={`mdi ${iconClassName} menu-icon`}></i>
                </a>
                <div className={`collapse ${this.isCollapsed || isActive ? 'show' : ''}`} id="ui-basic">
                    <ul className="nav flex-column sub-menu">
                        {subItems}
                    </ul>
                </div>
            </li> 
        )
    }
}
