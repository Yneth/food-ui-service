const extractBySchema = (object, schema) => {
    if (typeof object !== 'object') return object;

    return Object.keys(schema).reduce((result, key) => {
        result[key] = typeof schema[key] === 'object' ?
            extractBySchema(object[key], schema[key])
            :
            object[key];
        return result;
    }, {});
};

export default extractBySchema;

