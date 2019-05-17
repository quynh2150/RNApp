import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import _ from "lodash";

import Rules from './validation-rules.service';
// import Message from '../form-message.component/form-message.component';

class ValidationForm extends Component {
    constructor(props) {
        super(props);
        this.childs = [];
        this.attachToForm = this.attachToForm.bind(this);
        this.detachFromForm = this.detachFromForm.bind(this);
    }

    //The value of context type form
    getChildContext() {
        return {
            form: {
                attachToForm: this.attachToForm,
                detachFromForm: this.detachFromForm,
            },
        };
    }

    getValidator(validator, value) {
        let name = validator['key'];
        let pattern = validator['pattern'] || '';
        return Rules[name](value, pattern);
    }

    validate(input) {
        const value = input.props.value;
        const validators = input.props.validators;
        const component = this.find(this.childs, component => component.props.name === input.props.name);

        let valid = true;
        let validationResult = false;
        let result = [];

        validators.map((validator) => {
            validationResult = this.getValidator(validator, value);
            result.push({ input, result: validationResult });

            component.validate(component.props.value);
            return validator;
        })
        result.map((item) => {
            if (!item.result) {
                valid = false;
                this.errors.push(item.input);
            }
            return item;
        });

        return valid;
    }

    updateModel(component) {
        _.forEach(this.childs, function (child, component) {
            this.model[child] = component.props.value;
        });
    }

    componentDidMount() {
        this.childs = {};
        this.model = {};
    }

    attachToForm(component) {
        if (!this.childs.hasOwnProperty(component)) {
            this.childs[component.props.name] = component;
            // this.model[component.props.name] = component.props.value;
        }
    }

    detachFromForm(component) {
        if (this.childs.hasOwnProperty(component)) {
            delete this.childs[component.props.name];
            // delete this.model[component.props.name];
        }
    }

    render() {
        const { onSubmit, onError, ...props } = this.props;

        return (
            <View {...props}>
                {this.props.children}
            </View>
        );
    }
}

//pass data through all nodes in component tree.
ValidationForm.childContextTypes = {
    form: PropTypes.object,
};

ValidationForm.propTypes = {
    onError: PropTypes.func,
    children: PropTypes.node,
};

ValidationForm.defaultProps = {
    onError: () => { },
};


ValidationForm.addValidationRule = (name, callback) => {
    Rules[name] = callback;
};

export default ValidationForm;