import React from 'react';
import PropTypes from 'prop-types';

class IntlProvider extends React.Component {

    getChildContext() {
        return {
            messages: this.props.messages,
            locale: this.props.locale,
        };
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

IntlProvider.propTypes = {
    messages: PropTypes.objectOf(PropTypes.string),
    locale: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};

IntlProvider.defaultProps = {
    messages: {},
    locale: 'en',
};

IntlProvider.childContextTypes = {
    messages: PropTypes.objectOf(PropTypes.string),
    locale: PropTypes.string,
};

export default IntlProvider;
