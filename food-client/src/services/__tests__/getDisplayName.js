import getDisplayName from '../getDisplayName';

describe('#getDisplayName', () => {
    it('should return display name of Component', () => {
        const ComponentMock = {
            displayName: 'name',
        };

        expect(getDisplayName(ComponentMock)).toEqual(ComponentMock.displayName);
    });

    it('should return display name of Element', () => {
        const ElementMock = {
            name: 'name',
        };

        expect(getDisplayName(ElementMock)).toEqual(ElementMock.name);
    });

    it('should return "Component" for random object', () => {
        const RandomObject = {
            prop: 'prop',
        };

        expect(getDisplayName(RandomObject)).toEqual('Component');
    });

    it('should throw error without arguments', () => {
        expect(() => { getDisplayName(); }).toThrow();
    });

    it('should throw error with non object argument type', () => {
        expect(() => { getDisplayName('string'); }).toThrow();
    });
});
