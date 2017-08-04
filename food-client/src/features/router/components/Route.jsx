import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectMatch, selectRouterData } from '../selectors';

class Route extends React.Component {
    componentDidMount() {
        const { name, pattern } = this.props;
        const { router } = this.context;
        router.registerRoute(name, pattern);
    }

    componentWillUnmount() {
        const { router } = this.context;
        router.removeRoute(this.props.name);
    }

    render() {
        const { name, path, match, children } = this.props;
        return match
            ? React.cloneElement(children, { match: { name, path, params: match } })
            : null;
    }
}

Route.propTypes = {
    name: PropTypes.string,
    pattern: PropTypes.string,
    path: PropTypes.string,
    match: PropTypes.objectOf(PropTypes.string),
    children: PropTypes.element.isRequired,
};

Route.contextTypes = {
    router: PropTypes.shape({
        registerRoute: PropTypes.func.isRequired,
        removeRoute: PropTypes.func.isRequired,
    }),
};

const mapDispatchToProps = (state, ownProps) => ({
    match: selectMatch(state, ownProps.name),
    path: selectRouterData(state).path,
});

export default connect(mapDispatchToProps)(Route);
