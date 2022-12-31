/**
 * Reset style property on DOM element.
 * @param {string} className - target element class name.
 * @param {string} property - property name.
 * @returns {function} - anonymous function to reset a style property on a DOM element.
 */
 function resetStyleProperty(className, property) {
    const element = document.querySelector(`.${className}`);
    return function() {
        if(element.style[property]) element.style[property] = '';
    }
}