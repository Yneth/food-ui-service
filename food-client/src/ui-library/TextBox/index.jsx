import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const getId = () => {
    return Date.now().toString(36) + Math.random().toString(36);
};

class TextBox extends React.Component {

    constructor(props) {
        super(props);

        this.id = getId();

        this.state = {
            value: props.defaultValue,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { onChange } = this.props;
        const { value } = e.target;

        this.setState({ value });

        if (onChange) {
            onChange(value);
        }
    }

    renderLabel() {
        const { label } = this.props;

        return label ? <label htmlFor={this.id}>{ label }</label> : null;
    }

    renderInput(type, props) {
        const { value } = this.state;

        if (type === 'area') {
            return <textarea {...props}>{value}</textarea>;
        }

        return <input type={type} {...props} value={value} />;
    }

    render() {
        const { type } = this.props;

        const props = {
            id: this.id,
            onChange: this.handleChange,
        };

        return (
            <div>
                { this.renderLabel() }
                { this.renderInput(type, props) }
            </div>
        );
    }
}

TextBox.defaultProps = {
    type: 'text',
    defaultValue: '',
};

TextBox.propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.oneOf(['text', 'password', 'area']),
    defaultValue: PropTypes.string,
    label: PropTypes.string,
};

export default TextBox;
