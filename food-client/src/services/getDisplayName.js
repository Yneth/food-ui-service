export default function getDisplayName(Component) {
    if (typeof Component !== 'object') {
        throw new Error('Component is not an object');
    }

    return Component.displayName || Component.name || 'Component';
}
