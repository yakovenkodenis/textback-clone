import React, { Component } from 'react';
import { observer } from 'mobx-react';


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
                            {row.map((value, ind) => (
                                <td key={ind}>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
       );
    }
}
