import React from 'react';


const ListErrors = (props) => {

    alert(props);

    const { errors } = props;

    if (errors) {

        if (errors.constructor !== Array) {
            console.log('Errors object is not array!!!', errors);
            alert(errors);
            return null;
        }

        return (
            <ul className="list-arrow">
                {
                    errors.map((error, index) => (
                        <li className="text-danger" key={index}>
                            {error}
                        </li>
                    ))
                }
            </ul>
        )
    } else return null;
}

export default ListErrors;

