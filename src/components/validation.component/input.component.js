import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, Text } from 'react-native';

import Form from './form.component';
import Message from '../form-message.component/form-message.component';

class ValidationInput extends Component {
    constructor(props) {
        super(props);

        this.form = new Form();
        this.state = {
            isValid: true,
            validators: props.validators,
            errorMessages: [],
        }

        this.validate = this.validate.bind(this);
        this.getErrorMessage = this.getErrorMessage.bind(this);
    }

    componentWillMount() {
        this.context.form.attachToForm(this);
        if (!this.props.name) {
            throw new Error("Form field requires a name property to used");
        }
    };

    componentWillUnmount() {
        this.context.form.detachFromForm(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.validate(nextProps.value);
        }
        if (nextProps.validators && nextProps.errorMessages && this.props.validators !== nextProps.validators) {
            this.setState({ validators: nextProps.validators, errorMessages: nextProps.errorMessages });
        }
    }

    validate(value) {
        this.state.errorMessages = [];
        this.state.isValid = true;
        const result = [];
        let valid = true;
        this.state.validators.map((validator, index) => {
            var isValid = this.form.getValidator(validator, value);
            if (!isValid) {
                this.state.isValid = false;
            }
            return this.state.errorMessages.push(validator['message']);
        });
    }

    getErrorMessage() {
        const type = typeof this.state.errorMessages;
        if (type === 'string') {
            return this.state.errorMessages;
        }
        else if (type === 'object') {
            return this.state.errorMessages[0];
        }
    }

    isValid() {
        return this.state.isValid;
    }

    render() {
        const error = this.state.isValid ? '' : this.getErrorMessage();
        return (
            <View>
                <TextInput {...this.props} />
                <Message message={error} type={'error'} />
            </View>
        );
    }
}

ValidationInput.contextTypes = {
    form: PropTypes.object,
};

ValidationInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    validators: PropTypes.array,
    // validators: PropTypes.shape({
    //     key: PropTypes.oneOf(['required', 'email', 'min', 'max', 'match']),
    //     message: PropTypes.string,
    //     pattern: PropTypes.oneOfType([
    //         PropTypes.number,
    //         PropTypes.string,
    //     ]),
    // }),
    errorMessages: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
};

ValidationInput.defaultProps = {
    validators: [],
    errorMessages: []
};

export default ValidationInput;

