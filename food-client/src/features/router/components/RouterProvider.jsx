import React from 'react';
import PropTypes from 'prop-types';

class RouterProvider extends React.Component {

    getChildContext() {
        return {
            router: this.props.router,
        };
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

RouterProvider.propTypes = {
    router: PropTypes.shape({
        registerRoute: PropTypes.func.isRequired,
        removeRoute: PropTypes.func.isRequired,
    }),
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
};

RouterProvider.childContextTypes = {
    router: PropTypes.shape({
        registerRoute: PropTypes.func.isRequired,
        removeRoute: PropTypes.func.isRequired,
    }),
};

export default RouterProvider;
