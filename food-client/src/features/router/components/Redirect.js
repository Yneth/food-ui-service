import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from '../actions';

class Redirect extends React.Component {

    componentDidMount() {
        this.props.navigate(this.props.path);
    }

    render() {
        return null;
    }
}

Redirect.propTypes = {
    path: PropTypes.string,
    navigate: PropTypes.func,
};

export default connect(null, { navigate })(Redirect);
