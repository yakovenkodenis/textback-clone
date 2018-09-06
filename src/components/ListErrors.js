import React from 'react';
import shortid from 'shortid';


const ListErrors = (props) => {

    const { errors } = props;

    if (errors) {

        if (errors.constructor !== Array) {
            console.log('Errors object is not array!!!', errors);
            return null;
        }

        return (
            <ul className="list-arrow">
                {
                    errors.map((error) => (
                        <li className="text-danger" key={shortid.generate()}>
                            {error}
                        </li>
                    ))
                }
            </ul>
        )
    } else return null;
}

export default ListErrors;

