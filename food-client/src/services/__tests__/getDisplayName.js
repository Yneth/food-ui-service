import React from 'react';
import getDisplayName from '../getDisplayName';

describe('#getDisplayName', () => {
    it('should return display name of Component class', () => {
        class ComponentMock extends React.Component {}
        expect(getDisplayName(ComponentMock)).toBe('ComponentMock');
    });

    it('should return display name of functional Component', () => {
        const FunctionalComponent = () => {};
        expect(getDisplayName(FunctionalComponent)).toBe('FunctionalComponent');
    });

    it('should return "Component" for anonymous Component', () => {
        expect(getDisplayName(() => {})).toBe('Component');
    });

    it('should throw error without arguments', () => {
        expect(() => { getDisplayName(); }).toThrow();
    });

    it('should throw error with non object argument type', () => {
        expect(() => { getDisplayName('string'); }).toThrow();
    });
});
