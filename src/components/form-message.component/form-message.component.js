import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    messageContent: {
        marginRight: 10,
    },
});

const colors = { error: 'red', warning: 'yellow', normal: 'black', info: "green" };

class Message extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let style = { color: colors[this.props.type] || colors.normal };
        return (
            this.props.message ?
                (
                    <View>
                        <Text style={[styles.messageContent, style]}>
                            {this.props.message}
                        </Text>
                    </View>
                )
                : null
        );
    }
};

Message.propTypes = {
	message: PropTypes.string,
	type: PropTypes.oneOf(colors),
};

export default Message;
