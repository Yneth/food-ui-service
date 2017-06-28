import React from 'react';
import { shallow } from 'enzyme';
import withIntl from '../withIntl';

describe('withIntl HOC', () => {
    let MockContext;
    let MockComponent;

    beforeEach(() => {
        MockContext = { locale: 'fr', messages: { hello: 'hi' } };
        MockComponent = props => <div {...props} />;
    });

    it('should create correct display name', () => {
        const Wrapper = withIntl()(MockComponent);

        expect(Wrapper.displayName).toBe('withIntl(MockComponent)');
    });

    it('should pass props to wrapped', () => {
        const props = {
            prop: 'prop',
        };
        const Wrapper = withIntl()(MockComponent);
        const Wrapped = Wrapper(props, MockContext);

        const tree = shallow(Wrapped);

        expect(tree.prop('prop')).toBe(props.prop);
    });

    it('should pass context to wrapped', () => {
        const Wrapper = withIntl()(MockComponent);
        const Wrapped = Wrapper({}, MockContext);

        const tree = shallow(Wrapped);

        expect(tree.prop('locale')).toBe(MockContext.locale);
        expect(tree.prop('messages')).toEqual(MockContext.messages);
    });
});
