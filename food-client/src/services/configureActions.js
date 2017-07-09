export const getAsyncTypes = type => (
    {
        request: `${type}_REQUEST`,
        success: `${type}_SUCCESS`,
        failure: `${type}_FAILURE`,
    }
);

const configureActions = (prefix = '') => (type, interceptor) => {
    const prefixedType = prefix + type;

    const actionCreator = (...payload) => (
        {
            type: prefixedType,
            payload: interceptor ? interceptor(...payload) : payload[0],
        }
    );

    actionCreator.type = prefixedType;

    const asyncTypes = getAsyncTypes(prefixedType);
    const asyncCreator = (...payload) => (dispatch) => {
        dispatch({
            type: asyncTypes.request,
        });

        const promiseCreator = interceptor || (arg => Promise.resolve(arg));

        return promiseCreator(...payload)
            .then((result) => {
                if (!result.error) {
                    dispatch({ type: asyncTypes.success, result });
                } else {
                    dispatch({ type: asyncTypes.failure, error: result.error });
                }
            })
            .catch(error => dispatch({ type: asyncTypes.failure, error }));
    };

    asyncCreator.type = asyncTypes;

    actionCreator.async = asyncCreator;
    return actionCreator;
};

export default configureActions;
