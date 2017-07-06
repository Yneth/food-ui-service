import React from 'react';
import PropTypes from 'prop-types';
import getId from 'services/getId';
import './style.less';

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

        return label ?
            <label className="text-box__label" htmlFor={this.id}>{ label }</label>
            :
            null;
    }

    renderError() {
        const { error } = this.props;

        return error ? <span className="text-box__error">{ error }</span> : null;
    }

    renderInput(props) {
        const { type } = this.props;

        if (type === 'area') {
            return <textarea {...props} />;
        }

        return <input type={type} {...props} />;
    }

    render() {
        const { inputRef, placeholder } = this.props;
        const { value } = this.state;

        const props = {
            id: this.id,
            ref: inputRef,
            className: 'text-box__input',
            onChange: this.handleChange,
            value,
            placeholder,
        };

        return (
            <div>
                { this.renderLabel() }
                { this.renderInput(props) }
                { this.renderError() }
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
    inputRef: PropTypes.func,
    type: PropTypes.oneOf(['text', 'password', 'area']),
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
};

export default TextBox;
