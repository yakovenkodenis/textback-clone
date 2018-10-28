import React, { Component } from 'react';

import { Previous, Next, Submit } from './buttons';

export default class Step extends Component {
    render() {
        const {
            isActive,
            displayPrevious,
            displayNext,
            displaySubmit,
            component,
            children
        } = this.props;

        if (!isActive) return null;

        return (
            <React.Fragment>
                { component ? React.createElement(component) : children }
                <Previous
                    isActive={displayPrevious}
                    goToPreviousStep={() => this.props.goToPreviousStep()}
                />
                <Next
                    isActive={displayNext}
                    goToNextStep={() => this.props.goToNextStep()}
                />
                <Submit isActive={displaySubmit} />
            </React.Fragment>
        );
    }
}
