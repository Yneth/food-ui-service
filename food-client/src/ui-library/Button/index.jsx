import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'services/classNames';
import './style.less';

const Button = ({ type = 'primary', size = 'medium', className: customClassName, onClick, children }) => {
    const className = classNames(`button-${type}`, `button-${size}`, customClassName);

    return <button className={className} onClick={onClick}>{children}</button>;
};

Button.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
    onClick: PropTypes.func,
};

export default Button;
