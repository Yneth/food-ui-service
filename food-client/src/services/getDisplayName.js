import React from 'react';

export default function getDisplayName(Component) {
    if (!(Component instanceof React.Component) && typeof Component !== 'function') {
        throw new Error('Component is not a valid React Component');
    }

    return Component.displayName || Component.name || 'Component';
}
