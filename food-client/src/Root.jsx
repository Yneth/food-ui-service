import React from 'react';
import ReactDom from 'react-dom';
import Button from 'ui-library/Button';
import TextBox from 'ui-library/TextBox';

export default () => {
    ReactDom.render(
        <div>
            <Button>Click me!</Button>
            <TextBox
                inputRef={ref => console.log(ref)}
                type="text" label="Hello world:"
                placeholder="wow"
                error="big error"
            />
        </div>,
        document.getElementById('root'),
    );
};
