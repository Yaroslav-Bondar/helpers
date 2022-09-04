/**
 * creating tooltip for dom element
 * @param {object} elem - the element for which the tooltip is set
 * @param {string} styleClasses - css style class for tooltip
 * @param {string} hintMessage - tooltip text
 * @param {object} correct - tooltip adjustment coordinates relative to the top left corner of the element
 * @returns {object} - tooltip - doem element with syles and desired coordinates
 */
function createHint(elem, styleClasses, hintMessage, correct) {
    let hint;
    // create hint
    hint = document.createElement('div');
    hint.classList.add(`${styleClasses}`);
    hint.textContent = hintMessage;
    // adjust tooltip coordinates relative to top left corner of element
    const correctX = correct.x ? correct.x : 0;
    const correctY = correct.y ? correct.y : 0;
    return () => {
        // get the current coordinates of an element
        elemCoords = getCoordsPageContext(elem);
        // set hint coordinates
        hint.style.top = elemCoords.top + correctY + 'px';
        hint.style.left = elemCoords.left + correctX + 'px';
        return hint;
    }
}

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
