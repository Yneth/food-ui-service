import React from 'react';
import ReactDom from 'react-dom';
import Button from 'ui-library/Button';
import TextBox from 'ui-library/TextBox';

export default () => {
    ReactDom.render(
        <div>
            <Button>Click me!</Button>
            <TextBox type="area" label="Hello world:" defaultValue="Hello" />
        </div>,
        document.getElementById('root'),
    );
};
