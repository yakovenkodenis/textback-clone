import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const SidebarItem = ({
    itemName,
    routePath,
    iconClassName,
    location
}) => {
    const isActive = new RegExp(routePath).test(location.pathname);

    return (
        <li className={`nav-item ${isActive ? 'active' : ''}`}>
            <Link to={routePath} className="nav-link">
                <span className="menu-title">{itemName}</span>
                <i className={`mdi ${iconClassName} menu-icon`}></i>
            </Link>
        </li>
    );
}

export default withRouter(SidebarItem);
