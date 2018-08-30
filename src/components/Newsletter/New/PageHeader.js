import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const PageHeader = ({ isMobile }) =>
    <div className={`page-header ${isMobile ? "m-3" : "" }`}>
        <h3 className="page-title">Новая рассылка</h3>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/admin/newsletter'>Рассылки</Link>
                </li>
                <li className="breadcrumb-item active">
                    Новая рассылка
                </li>
            </ol>
        </nav>
    </div>

export default withRouter(PageHeader);
