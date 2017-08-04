import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from '../actions';
import { selectMatches } from '../selectors';

class Link extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const { to } = this.props;

        this.props.navigate(to);
    }

    render() {
        const { matches, to, activeClassName, children } = this.props;

        return <a href={to} className={matches ? activeClassName : ''} onClick={this.handleClick}>{ children }</a>;
    }
}

Link.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    navigate: PropTypes.func,
    matches: PropTypes.bool,
    activeClassName: PropTypes.string,
};

const mapDispatchToProps = (state, ownProps) => ({
    matches: selectMatches(state, ownProps.to),
});

export default connect(mapDispatchToProps, { navigate })(Link);
