import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const Button = ({ type = 'primary', size = 'medium', onClick, children }) => {
    const className = `button-${type} button-${size}`;

    return <button className={className} onClick={onClick}>{children}</button>;
};

Button.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
