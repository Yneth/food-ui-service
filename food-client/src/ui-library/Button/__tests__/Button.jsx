import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Button from '../index';

describe('Button component', () => {
    it('should render', () => {
        const tree = renderer.create(<Button>Hello</Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render with type specified', () => {
        const tree = renderer.create(<Button type="danger">Hello</Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render with size specified', () => {
        const tree = renderer.create(<Button size="large">Hello</Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should render with custom className', () => {
        const tree = renderer.create(<Button className="custom_class">Hello</Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should call handler on click event', () => {
        const handler = jest.fn();
        const wrapper = mount(<Button onClick={handler}>Hello</Button>);
        wrapper.find('button').simulate('click');

        expect(handler).toHaveBeenCalled();
    });
});
