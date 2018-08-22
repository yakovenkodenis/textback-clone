import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const PageHeader = () =>
    <div className="page-header">
        <h3 className="page-title">Новая цепочка</h3>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to='/admin/autofunnels'>Автоворонки</Link>
                </li>
                <li className="breadcrumb-item active">
                    Новая цепочка
                </li>
            </ol>
        </nav>
    </div>

export default withRouter(PageHeader);
