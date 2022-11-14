/**
 * setting padding on element B which is based on the height of element A
 * 
 * example of use:
 * const setMobileMenuPadding = setPaddingBasedOnHeight();
 * setMobileMenuPadding(elementA, elementB);
 * 
 * @returns {function} - an anonymous function that takes element 
 *                       A and element B as arguments and 
 *                       adjusts element B's padding to match the height of element A
 */

 const setPaddingBasedOnHeight = () => {
    let prevHeight;
    return (elementA, elementB) => {
        const currentHeight = elementA.offsetHeight;
        if(prevHeight === currentHeight) return;
        console.log('start padding...');
        elementB.style.paddingTop = currentHeight + 'px';
        prevHeight = currentHeight;
    }
}