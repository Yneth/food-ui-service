import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import TextBox from '../';

describe('TextBox component', () => {
    it('should render input', () => {
        const tree = renderer.create(<TextBox />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render textarea', () => {
        const tree = renderer.create(<TextBox type="area" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render input with customization', () => {
        const tree = renderer.create(
            <TextBox
                defaultValue="val"
                label="INPUT:"
                error="NOT VALID"
                className="custom class"
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should call handler on change event', () => {
        const handler = jest.fn();
        const wrapper = mount(<TextBox onChange={handler}>Hello</TextBox>);
        wrapper.find('input').simulate('change', { target: { value: 'hello' } });

        expect(handler).toHaveBeenCalledWith('hello');
    });
});

