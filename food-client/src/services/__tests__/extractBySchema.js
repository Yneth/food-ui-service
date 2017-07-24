import extractBySchema from '../extractBySchema';

describe('extractBySchema service', () => {
    it('should extract part of object tree by schema', () => {
        const tree = {
            prop1: {
                internalProp1: 'internalProp1',
                internalProp2: 'internalProp2',
            },
            prop2: 'prop2',
            prop3: 'prop3',
            prop4: {
                internalProp3: {
                    superInternalProp1: 'superInternalProp1',
                },
                internalProp4: {
                    superInternalProp2: 'superInternalProp2',
                    superInternalProp3: 'superInternalProp3',
                },
            },
        };

        const schema = {
            prop1: {
                internalProp1: true,
            },
            prop2: true,
            prop4: {
                internalProp3: true,
                internalProp4: {
                    superInternalProp3: true,
                },
            },
        };

        expect(extractBySchema(tree, schema)).toEqual({
            prop1: {
                internalProp1: 'internalProp1',
            },
            prop2: 'prop2',
            prop4: {
                internalProp3: {
                    superInternalProp1: 'superInternalProp1',
                },
                internalProp4: {
                    superInternalProp3: 'superInternalProp3',
                },
            },
        });
    });

    it('should extract undefined if part is not found in schema part', () => {
        const tree = {
            prop1: 'prop1',
        };

        const schema = {
            prop1: true,
            prop2: true,
        };

        expect(extractBySchema(tree, schema)).toEqual({
            prop1: 'prop1',
            prop2: undefined,
        });
    });

    it('should extract value if part of tree is not object as described in schema', () => {
        const tree = {
            prop1: 'prop1',
            prop3: 'prop3',
        };

        const schema = {
            prop1: {
                prop2: true,
            },
            prop3: true,
        };

        expect(extractBySchema(tree, schema)).toEqual({
            prop1: 'prop1',
            prop3: 'prop3',
        });
    });
});
