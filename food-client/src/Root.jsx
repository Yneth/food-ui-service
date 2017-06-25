import React from 'react';
import ReactDom from 'react-dom';
import Button from 'ui-library/Button';

export default () => {
    ReactDom.render(
        <Button>Click me!</Button>,
        document.getElementById('root'),
    );
};
