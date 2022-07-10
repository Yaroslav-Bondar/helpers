/**
 * returns the coordinates of the dom element in the context of the page 
 * @param {object} - the dom element for which the coordinates are calculated
 * @returns {object} - the coordinates of the dom element in the context of the page
 */
function getCoordsPageContext(elem) {
    const coords = elem.getBoundingClientRect();
    return {
        top: coords.top + window.pageYOffset,
        left: coords.left + window.pageXOffset,
        bottom: coords.bottom + window.pageYOffset,
        right: coords.right + window.pageXOffset,
    }
}
