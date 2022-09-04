// create hint
const element = document.querySelector('.element');
let tooltipText = 'Hello I am tooltip';
const closeHint = createHint(element, 'tooltip', tooltipText, {y: -18, x: 40});
// set hint
element.addEventListener('mouseover', () => {
    document.body.append(closeHint());
});
// hide hint
element.addEventListener('mouseout', () => {
    closeHint().remove();
});