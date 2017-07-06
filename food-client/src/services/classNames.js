const SEPARATOR = ' ';

const parseArray = names => (
    names
        .filter(name => name)
        .join(SEPARATOR)
);


const parseObject = names => (
    Object
        .keys(names)
        .filter(name => names[name])
        .join(SEPARATOR)
);

const classNames = (...rest) => (
    rest
        .map((arg) => {
            if (typeof arg === 'string') {
                return arg;
            } else if (Array.isArray(arg)) {
                return parseArray(arg);
            } else if (typeof arg === 'object') {
                return parseObject(arg);
            }

            return null;
        })
        .filter(arg => arg)
        .join(SEPARATOR)
);

export default classNames;
