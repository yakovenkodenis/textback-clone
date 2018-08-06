import React, { Component } from 'react';
import { observer } from 'mobx-react';
import  Avatar from 'react-avatar';


@observer
export default class DataTable extends Component {

   render() {

        const { data, columns } = this.props;

       return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} {...column}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <Avatar name={row[0]} size="50" round={true} />
                            </td>

                            {row.map((value, ind) => (
                                <td key={ind}>{value}</td>
                            ))}

                            <td>
                                <label className="badge badge-success">
                                    <i className="mdi mdi-message-text" />
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
       );
    }
}