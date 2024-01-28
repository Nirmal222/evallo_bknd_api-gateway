let seen = {};
const replacer = (key, value) => {
    // Check for circular references
    if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
            return '[Circular Reference]';
        }
        seen.add(value);
    }
    return value;
}

module.exports = {
    replacer
}