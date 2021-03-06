import React, { Component } from 'react';

export default class StepList extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            currentStep: 0,
            totalSteps: this.props.children.length - 1
        }
    }

    goToPreviousStep = () => {
        this.setState({
            currentStep: this.state.currentStep - 1
        });
    }

    goToNextStep = () => {
        this.setState({
            currentStep: this.state.currentStep + 1
        });
    }

    render() {
        const children = React.Children.map(this.props.children, (child, index) => {
            const { currentStep, totalSteps } = this.state;

            return React.cloneElement(child, {
                isActive: index === currentStep,
                displayPrevious: currentStep > 0,
                displayNext: currentStep < totalSteps,
                displaySubmit: currentStep === totalSteps,
                goToPreviousStep: () => this.goToPreviousStep(),
                goToNextStep: () => this.goToNextStep()
            });
        });

        return children;
    }
}