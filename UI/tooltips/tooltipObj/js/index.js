// https://developer.mozilla.org/ru/docs/Web/API/Element/getAttribute
// https://developer.mozilla.org/ru/docs/Web/API/Element/setAttribute
// https://www.w3schools.com/jsref/prop_html_style.asp
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// https://jsfiddle.net/Yaroslav_Bondar/gkp9u5qc/3/

function Tooltip(targetClassName, content = 'I am tooltip', position = 'top', styles = null) {
	this._target = document.getElementsByClassName(targetClassName)[0];
    this._content = content; 
    this._position = position;
    this._styles = styles;
    this._constructor = Object.getPrototypeOf(this).constructor;
    this._positions = new Set(['top', 'left', 'right', 'bottom']); // possible implementation as a static property

    Object.defineProperties(this, {
        positioning: {
            get: function() {
                return this._position;
            },
            set: function(value) {
                // check current entered position
                if(this._position === value) {
                    console.log('Warning: Current position is equivalent to given position !!!');
                    return false;
                };
                // Check the entered keyword desrcribing the position.
                if(!this._positions.has(value)) {
                    console.log("Warning: Invalid position value: must be a string of 'top','left','right','bottom' !!!");
                    return false;
                };
                this._tooltipItem.classList.replace(`tooltip__item_position_${this._position}`, `tooltip__item_position_${value}`);
                this._position = value;
                return true;
            },
            
        },
    });
    this._setTooltip();
}
// static methods
Tooltip.upperToHyphenLower = upper => '-' + upper.toLowerCase();

Tooltip.styleHyphenFormat = function(styles) {
    let str = JSON.stringify(styles);
    let output = str.replace(/[{"}]/g, '')
				        .replace(/,/g, ';')
                        .replace(/[A-Z]/g, this.upperToHyphenLower) + ';';
    return output;
}
// method prototypes
Tooltip.prototype._setTooltip = function () {
    const tooltipContainer = document.createElement('div');
    const tooltipHtml = `<div class='tooltip__item tooltip__item_position_${this._position}'>
                            ${this._content}
                        </div>
                        <div class='tooltip__target'></div>`;
    tooltipContainer.classList.add('tooltip');
    tooltipContainer.insertAdjacentHTML('afterbegin', tooltipHtml);
    // insert tooltip container after target
    this._target.after(tooltipContainer);
    // get tooltip__target
    const tooltipTarget = tooltipContainer.querySelector('.tooltip__target');
    tooltipTarget.append(this._target);
    this._tooltipItem = tooltipContainer.querySelector('.tooltip__item');
    // set handlers
    tooltipTarget.onmouseenter = this._showTooltip.bind(this);
    tooltipTarget.onmouseleave = this._hideTooltip.bind(this);
    // set styles
    this.setStyles(this._styles);
}
Tooltip.prototype.setStyles = function(styles) {
    if(this._styles) {
        const stylesString = this._constructor.styleHyphenFormat(this._styles);
        this._tooltipItem.style.cssText = stylesString;
        return true;
    }
    console.log('styles are not defined, default styles will be defined');
    return false;
}
Tooltip.prototype._showTooltip = function() {
    this._tooltipItem.classList.add('tooltip__item_active');
}
Tooltip.prototype._hideTooltip = function () {
    this._tooltipItem.classList.remove('tooltip__item_active');
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
function TooltipExt(targetClassName, content = 'I am tooltip extended', position = 'top', styles = {
        borderLeft: '2px solid red', color: 'green',
    }) 
{
    const positionName = 'Extended position Name';
    // call parents constructor
    Tooltip.call(this, targetClassName, content, position, styles);
}
// protype method inheritance 
Object.setPrototypeOf(TooltipExt.prototype, Tooltip.prototype);
// static method inheritance
Object.setPrototypeOf(TooltipExt, Tooltip); // or: TooltipExt.__proto__ = Tooltip; 
const tooltipExt = new TooltipExt('element3');
// console.log('tooltipExt', tooltipExt);
// console.log('TooltipExt.__proto__:', TooltipExt.__proto__);
tooltipExt.positioning = 'left';
// console.log('TooltipExt', TooltipExt);
// console.log('tooltipExt.positioning', tooltipExt.positioning);
// console.log('tooltipExt.constructor', tooltipExt.constructor);