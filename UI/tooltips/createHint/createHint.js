/**
 * creating tooltip for dom element
 * @param {object} elem - the element for which the tooltip is set
 * @param {string} hintStyles - css style class for tooltip
 * @param {string} hintMessage - tooltip text
 * @param {object} correct - tooltip adjustment coordinates relative to the top left corner of the element
 * @returns {object} - tooltip - doem element with syles and desired coordinates
 */
function createHint(elem, hintStyles, hintMessage, correct) {
    let hint;
    // create hint
    hint = document.createElement('div');
    hint.classList.add(`${hintStyles}`);
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
