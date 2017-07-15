import deepFreeze from '../deepFreeze';
import { addItem, removeItem } from '../immutable';

describe('immutable service', () => {
    describe('addItem', () => {
        describe('object destination', () => {
            it('should add item to object', () => {
                const object = {
                    prop1: 'prop1',
                    prop2: 'prop2',
                };

                deepFreeze(object);

                const item = { id: 'prop3', name: 'item' };

                expect(addItem(object, item)).toEqual({
                    prop1: 'prop1',
                    prop2: 'prop2',
                    prop3: item,
                });
            });

            it('should add item to object with merge param', () => {
                const object = {
                    prop1: 'prop1',
                    prop2: 'prop2',
                };

                deepFreeze(object);

                const item = { id: 'prop3', name: 'item' };

                expect(addItem(object, item, true)).toEqual({
                    prop1: 'prop1',
                    prop2: 'prop2',
                    prop3: item,
                });
            });

            it('should replace item in object', () => {
                const object = {
                    prop1: 'prop1',
                    prop2: 'prop2',
                };

                deepFreeze(object);

                const item = { id: 'prop2', name: 'item' };

                expect(addItem(object, item)).toEqual({
                    prop1: 'prop1',
                    prop2: item,
                });
            });

            it('should replace primitive item in object with merge param', () => {
                const object = {
                    prop1: 'prop1',
                    prop2: 'prop2',
                };

                deepFreeze(object);

                const item = { id: 'prop2', name: 'item' };

                expect(addItem(object, item, true)).toEqual({
                    prop1: 'prop1',
                    prop2: item,
                });
            });

            it('should merge item in object', () => {
                const object = {
                    prop1: 'prop1',
                    prop2: {
                        id: 'prop2',
                        surname: 'proper',
                        dimensions: {
                            y: 2,
                        },
                    },
                };

                deepFreeze(object);

                const item = {
                    id: 'prop2',
                    name: 'item',
                    dimensions: {
                        x: 1,
                    },
                };

                expect(addItem(object, item, true)).toEqual({
                    prop1: 'prop1',
                    prop2: { id: 'prop2', name: 'item', surname: 'proper', dimensions: { x: 1, y: 2 } },
                });
            });
        });
        describe('array destination', () => {
            it('should add item to array', () => {
                const array = [
                    'prop1',
                    'prop2',
                ];

                deepFreeze(array);

                const item = { id: 'prop3', name: 'item' };

                expect(addItem(array, item)).toEqual([
                    'prop1',
                    'prop2',
                    item,
                ]);
            });

            it('should add item to array with merge param', () => {
                const array = [
                    'prop1',
                    'prop2',
                ];

                deepFreeze(array);

                const item = { id: 'prop3', name: 'item' };

                expect(addItem(array, item, true)).toEqual([
                    'prop1',
                    'prop2',
                    item,
                ]);
            });

            it('should replace item in array', () => {
                const array = [
                    'prop1',
                    { id: 'prop2', name: 'name' },
                ];

                deepFreeze(array);

                const item = { id: 'prop2', surname: 'surname' };

                expect(addItem(array, item)).toEqual([
                    'prop1',
                    item,
                ]);
            });

            it('should not add duplicate primitive', () => {
                const array = [
                    'prop1',
                    'prop2',
                ];

                deepFreeze(array);

                const item = 'prop2';

                expect(addItem(array, item)).toEqual(array);
            });

            it('should merge item in array', () => {
                const array = [
                    'prop1',
                    {
                        id: 'prop2',
                        surname: 'proper',
                        dimensions: {
                            y: 2,
                        },
                    },
                ];

                deepFreeze(array);

                const item = {
                    id: 'prop2',
                    name: 'item',
                    dimensions: {
                        x: 1,
                    },
                };

                expect(addItem(array, item, true)).toEqual([
                    'prop1',
                    { id: 'prop2', name: 'item', surname: 'proper', dimensions: { x: 1, y: 2 } },
                ]);
            });
        });
    });

    describe('removeItem', () => {
        it('should remove item from object by id', () => {
            const object = {
                prop1: 'prop1',
                prop2: 'prop2',
            };

            deepFreeze(object);

            expect(removeItem(object, { id: 'prop2' })).toEqual({
                prop1: 'prop1',
            });
        });

        it('should remove item from array by id', () => {
            const array = [
                { id: 'prop1' },
                { id: 'prop2' },
            ];

            deepFreeze(array);

            expect(removeItem(array, { id: 'prop2' })).toEqual([
                { id: 'prop1' },
            ]);
        });

        it('should remove primitive from array', () => {
            const array = [
                'prop1',
                'prop2',
            ];

            deepFreeze(array);

            expect(removeItem(array, 'prop2')).toEqual([
                'prop1',
            ]);
        });
    });
});
