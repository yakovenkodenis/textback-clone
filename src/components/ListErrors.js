import React from 'react';


const ListErrors = ({ errors }) => {
    if (errors) {
        return (
            <ul>
                {
                    Object.keys(errors).map(key => (
                        <li key={key}>
                            {key} {errors[key]}
                        </li>
                    ))
                }
            </ul>
        )
    } else return null;
}

export default ListErrors;

