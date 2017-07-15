const deepMerge = (destination, source) => {
    if (destination === undefined) return source;

    if (typeof destination !== 'object' || typeof source !== 'object') {
        return source;
    }

    return Object.keys(source).reduce((result, key) => {
        result[key] = deepMerge(result[key], source[key]);

        return result;
    }, Object.assign({}, destination));
};

const findIndex = (array, item) => {
    return typeof item === 'object' ?
        array.findIndex(x => x.id === item.id)
        :
        array.indexOf(item);
};

const addToArray = (array, item, merge) => {
    const index = findIndex(array, item);
    const existingItem = array[index];
    if (existingItem === item) return array;

    if (index === -1) {
        return [
            ...array,
            item,
        ];
    }

    return [
        ...array.slice(0, index),
        (merge ? deepMerge(existingItem, item) : item),
        ...array.slice(index + 1),
    ];
};

const addToObject = (object, item, merge) => {
    const id = item.id;

    return {
        ...object,
        [id]: merge ? deepMerge(object[id], item) : item,
    };
};

export const addItem = (destination, item, merge = false) => {
    const handler = Array.isArray(destination) ? addToArray : addToObject;
    return handler(destination, item, merge);
};

const removeFromArray = (array, item) => (
    typeof item === 'object' ?
        array.filter(x => x.id !== item.id)
        :
        array.filter(x => x !== item)
);

const removeFromObject = (object, { id }) => {
    const result = Object.assign({}, object);
    delete result[id];
    return result;
};

export const removeItem = (destination, item) => {
    const handler = Array.isArray(destination) ? removeFromArray : removeFromObject;
    return handler(destination, item);
};
