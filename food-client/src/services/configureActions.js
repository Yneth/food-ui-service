const configureActions = (prefix = '') => (type, creator) => {
    const prefixedType = prefix + type;

    const actionCreator = (...payload) => (
        {
            type: prefixedType,
            payload: creator ? creator(...payload) : payload[0],
        }
    );

    actionCreator.type = prefixedType;

    return actionCreator;
};

export default configureActions;
