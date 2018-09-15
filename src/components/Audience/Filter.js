import React, { Component } from 'react';


export default class Filter extends Component {
    render() {
        return (
            <form className="form-inline">
                <div className="input-group mb-2 mr-sm-2">
                    <label className="sr-only" />
                    <input type="text" className="form-control mb-2 mr-sm-2"/>
                </div>

                <div className="input-group mb-2 mr-sm-2">
                    <label className="sr-only" />
                    <input type="text" className="form-control mb-2 mr-sm-2"/>
                    <span
                        aria-hidden="true"
                        className="align-self-center pb-2 pl-2" 
                        style={{
                            cursor: 'pointer',
                            transform: 'scale(1.5)'
                        }}
                    >
                        ×
                    </span>
                </div>
            </form>
        )
    }
}
