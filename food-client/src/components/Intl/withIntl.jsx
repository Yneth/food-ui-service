import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'services/getDisplayName';

const withIntl = () => (WrappedComponent) => {
    const Wrapper = (props, context) => {
        const { locale, messages } = context;

        return <WrappedComponent locale={locale} messages={messages} {...props} />;
    };

    Wrapper.contextTypes = {
        messages: PropTypes.objectOf(PropTypes.string),
        locale: PropTypes.string,
    };

    Wrapper.displayName = `withIntl(${getDisplayName(WrappedComponent)})`;

    return Wrapper;
};

export default withIntl;
