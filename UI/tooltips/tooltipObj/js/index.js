
function Tooltip(target, content, position = 'top') {
	this.target = document.getElementsByClassName(target)[0];
    this.content = content;
    // console.log('this from Tooltip', this); 
    // this.tooltipTarget = 'adf';
    // this.setTooltip = setTooltip;

    // this.position = position;
    // console.log(this.content);
    
    Object.defineProperties(this, {
        position: {
            get: function() {
                return position;
            },
            set: function(value) {
                // if(!position) position = 'top'
                // else 
                position = value;
            },
            // writable: 2,
        }
    });
    this.setTooltip('element', 'Hello I am Tooltip');
    this.showHandler = this.showTooltip.bind(this);
    // this.setTooltip(this.target, content, this.position);
}

Tooltip.prototype.setTooltip = function (target, content, position) {
    const tooltipContainer = document.createElement('div');
    const tooltipHtml = `<div class='tooltip__item'>${this.content}</div>
                        <div class='tooltip__target'></div>`;
    tooltipContainer.classList.add('tooltip');
    tooltipContainer.insertAdjacentHTML('afterbegin', tooltipHtml);
    // insert tooltip container after target
    this.target.after(tooltipContainer);
    // get tooltip__target
    this.tooltipTarget = tooltipContainer.querySelector('.tooltip__target');
    this.tooltipTarget.append(this.target);
    this.tooltipItem = tooltipContainer.querySelector('.tooltip__item');
    // this.tooltipTarget.addEventListener('mouseenter', this.showHandler);
    this.tooltipTarget.addEventListener('mouseenter', this.showHandler);
    this.tooltipTarget.onmouseenter = this.showHandler;
    console.log(thi)
}
Tooltip.prototype.showTooltip = function() {
    console.log(this)
    this.tooltipItem.classList.toogle('tooltip__item_active');
}
Tooltip.prototype.hideTooltip = function() {
    this.tooltipItem.classList.toogle('tooltip__item_active');
}

const tooltip = new Tooltip('element', 'Hello I am Tooltip');
console.log(tooltip);
// console.log(tooltip.tooltipTarget);
// tooltip.setTooltip = Tooltip.prototype.setTooltip;
// tooltip.position = 'top';
// console.log(tooltip);
// console.log(tooltip.tooltipHtml);
// console.log(tooltip.content);
// tooltip.setTooltip('element', 'Hello I am Tooltip')
// console.log('tooltip.target', tooltip.tooltipTarget);
// console.log(Object.getOwnPropertyDescriptor(tooltip, 'position'));
// console.log(Object.getOwnPropertyDescriptors(tooltip));