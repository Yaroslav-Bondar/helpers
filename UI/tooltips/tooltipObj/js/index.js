// https://developer.mozilla.org/ru/docs/Web/API/Element/getAttribute
// https://developer.mozilla.org/ru/docs/Web/API/Element/setAttribute
// https://www.w3schools.com/jsref/prop_html_style.asp
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// https://jsfiddle.net/Yaroslav_Bondar/gkp9u5qc/3/

function Tooltip(targetClassName, content = 'I am tooltip', position = 'top', styles = null) {
	this.target = document.getElementsByClassName(targetClassName)[0];
    this.content = content; 
    this.position = position;
    this.styles = styles;
    this.constructor = Object.getPrototypeOf(this).constructor;
    this.positions = new Set(['top', 'left', 'right', 'bottom']); // possible implementation as a static property

    Object.defineProperties(this, {
        positioning: {
            get: function() {
                return this.position;
            },
            set: function(value) {
                // 1 check current nd entered position
                if(this.position === value) return;
                // 2 Check the entered keyword  desrcribing the position.
                // Should be  string contining  'top', 'left', 'right', 'bottom'
                if(!this.positions.has(value)) return;
                this.tooltipItem.classList.replace(`tooltip__item_position_${this.position}`, `tooltip__item_position_${value}`);
                this.position = value;
            },
        }
    });
    this.setTooltip();
}
// static methods
Tooltip.upperToHyphenLower = upper => '-' + upper.toLowerCase();

Tooltip.styleHyphenFormat = function(styles) {
    let str = JSON.stringify(styles);
    console.log('this', this);
    let output = str.replace(/[{"}]/g, '')
				        .replace(/,/g, ';')
                        .replace(/[A-Z]/g, this.upperToHyphenLower) + ';';
    return output;
}
// method prototypes
Tooltip.prototype.setTooltip = function () {
    const tooltipContainer = document.createElement('div');
    const tooltipHtml = `<div class='tooltip__item tooltip__item_position_${this.position}'>
                            ${this.content}
                        </div>
                        <div class='tooltip__target'></div>`;
    tooltipContainer.classList.add('tooltip');
    tooltipContainer.insertAdjacentHTML('afterbegin', tooltipHtml);
    // insert tooltip container after target
    this.target.after(tooltipContainer);
    // get tooltip__target
    this.tooltipTarget = tooltipContainer.querySelector('.tooltip__target');
    this.tooltipTarget.append(this.target);
    this.tooltipItem = tooltipContainer.querySelector('.tooltip__item');
    // set handlers
    this.tooltipTarget.onmouseenter = this.showTooltip.bind(this);
    this.tooltipTarget.onmouseleave = this.hideTooltip.bind(this);
    // set styles
    this.setStyles(this.styles);
}
Tooltip.prototype.setStyles = function(styles) {
    if(this.styles) {
        const stylesString = this.constructor.styleHyphenFormat(this.styles);
        this.tooltipItem.style.cssText = stylesString;
        return true;
    }
    console.log('styles are not defined, default styles will be defined');
    return false;
}
Tooltip.prototype.showTooltip = function() {
    this.tooltipItem.classList.add('tooltip__item_active');
}
Tooltip.prototype.hideTooltip = function () {
    this.tooltipItem.classList.remove('tooltip__item_active');
}

const tooltip = new Tooltip('element', 'Hello I am Tooltip', 'left');
tooltip.positioning = 'bottom';
// console.log(tooltip);
const tooltip2 = new Tooltip('element2', 'Hello I am Tooltip 2', 'right', {
        backgroundColor: 'green', 
        color: 'orange',
        borderBottom: '2px solid red',
        borderTop: '4px dashed blue',
        left: 0, 
    }); 
//console.log(tooltip2);
tooltip2.positioning = 'top';
tooltip2.positioning = 'lefte';
//console.log(tooltip2.positioning);

// inheritance

// TooltipExt(targetClassName, content = 'I am tooltip', position = 'top', styles = null) {
//     toll
// }

