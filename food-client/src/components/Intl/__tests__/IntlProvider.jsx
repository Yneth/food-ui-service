import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import IntlProvider from '../IntlProvider';

describe('IntlProvider', () => {
    it('should render children', () => {
        const tree = renderer.create(<IntlProvider><div>Provider</div></IntlProvider>);

        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should provide intl context', () => {
        const locale = 'fr';
        const messages = { hello: 'hi' };

        const tree = shallow(
            <IntlProvider locale={locale} messages={messages}><div>Provider</div></IntlProvider>,
        );

        expect(tree.instance().getChildContext()).toEqual({ locale, messages });
    });
});
