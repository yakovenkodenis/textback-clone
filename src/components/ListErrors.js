import React from 'react';


const ListErrors = ({ errors }) => {
    if (errors) {
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

