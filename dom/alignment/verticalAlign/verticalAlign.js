/**
 * placing an element below another element out of page context 
 * to apply a function more than once and correctly add/remove Eventlistener, 
 * use a closure and return of an anonymous function
 * @param {object} topElement - top dom-element
 * @param {object} bottomElement - top dom-element
 * @returns {function} - an anonymous function that aligns elements when launched
 */
 const verticalAlign = (topElementClassName, bottomElementClassName) => {
    const topElement = document.querySelector(`.${topElementClassName}`);
    const bottomElement = document.querySelector(`.${bottomElementClassName}`);
    let {top} = getCoordsPageContext(bottomElement);
        return () => {
            const {bottom} = topElement.getBoundingClientRect();
            if(bottom != top) {
                bottomElement.style.top = bottom + 'px';
                // top position caching
                top = bottom
            } 
    }
}