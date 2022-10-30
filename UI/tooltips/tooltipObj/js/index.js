// https://developer.mozilla.org/ru/docs/Web/API/Element/getAttribute
// https://developer.mozilla.org/ru/docs/Web/API/Element/setAttribute
// https://www.w3schools.com/jsref/prop_html_style.asp
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// https://jsfiddle.net/Yaroslav_Bondar/gkp9u5qc/3/

// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
// https://learn.javascript.ru/weakmap-weakset
// https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13
// https://stackoverflow.com/questions/28814585/how-to-check-if-type-is-boolean

// {
//     [Tooltip.generateId()]: new Tooltip('element', 'Hello I am Tooltip', 'left'),

// }


function Tooltip(targetClassName, content = 'I am tooltip', position = 'top', styles = null, archive) {
    this._target = document.getElementsByClassName(targetClassName)[0];
    this._content = content; 
    this._position = position;
    // this._styles = styles;
    this._constructor = Object.getPrototypeOf(this).constructor;
    this.id = this._constructor.uid();
    this._constructor.archive[this.id] = this;
    this._styles = styles ? this._constructor.styleHyphenFormat(styles) : styles;
    // this._positions = new Set(['top', 'left', 'right', 'bottom']); // move it to the prototype !!!
    this._setTooltip();
}
// static properties
// Tooltip.tooltipArchive = new WeakMap();
Tooltip.archive = Object.create(Object.prototype);
// static methods
/**
 * Generating a unique id. For more details see Readme.md file
 */
Tooltip.uid = () => String(Date.now().toString(36) + Math.random().toString(16)).replace(/\./g, '');
Tooltip.upperToHyphenLower = upper => '-' + upper.toLowerCase();
Tooltip.styleToMultiline = style => style.replace(/;/g, ';\n');
Tooltip.styleHyphenFormat = function(styles) {
    let str = JSON.stringify(styles);
    let output = str.replace(/[{"}]/g, '')
				        .replace(/,/g, ';')
                        .replace(/[A-Z]/g, this.upperToHyphenLower) + ';';
    return output;
}
// prototype getters/setters
Object.defineProperties(Tooltip.prototype, {
    currentPosition: {
        get: function() {
            console.log(`Position value is ${this._position}`);
            return this._position;
        },
        set: function(value) {
            // check current entered position
            if(this._position === value) {
                console.log(`Position change warning: Current position - ${this._position} is equivalent to given position - ${value} !!!`);
            };
            // Check the entered keyword desrcribing the position.
            if(!this._positions.has(value)) {
                let positions = '';
                this._positions.forEach(value => positions += `${value} `);
                console.log(`Position change warning: Invalid position value. Must be a string containing one of the values: ${positions}`);
            };
            this._tooltipItem.classList.replace(`tooltip__item_position_${this._position}`, `tooltip__item_position_${value}`);
            this._position = value;
        },
        
    },
    // available positions getter

});
// prototype properties
Tooltip.prototype._positions = new Set(['top', 'left', 'right', 'bottom']);
// Tooltip.prototype._classes = {
//     tooltipItem: 'tooltip__item',
// }
// prototype methods
Tooltip.prototype._setTooltip = function () {
    const tooltipContainer = document.createElement('div');
    const tooltipHtml = `<div id=${this.id} class='tooltip__item tooltip__item_position_${this._position}'>
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
    if(this._styles) this._tooltipItem.style.cssText = this._styles;
    // this.setStyles(this._styles);
}
// Tooltip.prototype.setStyles = function(styles) {
//     if(this._styles) {
//         const stylesString = this._constructor.styleHyphenFormat(this._styles);
//         this._tooltipItem.style.cssText = stylesString;
//         return true;
//     }
//     console.log('styles are not defined, default styles will be defined');
//     return false;
// }
Tooltip.prototype.showStyles = function(allSheets = false) {
    if(this._styles) {
        console.log('this._styles\n', this._constructor.styleToMultiline(this._styles));
        
    } else {
        console.log('custom styles are not defined', this._styles);
    }
    console.log('CSS styles:');
    for(const sheet of document.styleSheets) {
        const rules = sheet.cssRules;
        const targetRules = [...rules].filter(({selectorText}) => /^\.tooltip__item(_[a-z]+){0,2}$/.test(selectorText));
        if(targetRules.length) {
            const {href, ownerNode} = sheet;
            console.log('ownerNode', ownerNode);
            console.log('href', href);
            targetRules.forEach(rule => {
                console.log('cssText', rule.cssText);
            });
            if(!allSheets) break;
        }; 
    }
}
Tooltip.prototype._showTooltip = function() {
    this._tooltipItem.classList.add('tooltip__item_active');
}
Tooltip.prototype._hideTooltip = function () {
    this._tooltipItem.classList.remove('tooltip__item_active');
}

// instances

// const tooltip = 
new Tooltip('element', 'Hello I am Tooltip', 'left');
// console.log(tooltip.currentPosition = 'bottom');
// tooltip.currentPosition;
// console.log('tooltip currentPosition', tooltip.currentPosition);
// tooltip.showStyles();
// console.log(tooltip);
// const tooltip2 = 
new Tooltip('element2', 'Hello I am Tooltip 2', 'right', {
        backgroundColor: 'green', 
        color: 'orange',
        borderBottom: '2px solid red',
        borderTop: '4px dashed blue',
    }); 
//console.log(tooltip2);
// tooltip2.currentPosition = 'top';
// tooltip2.currentPosition = 'lefte';
// console.log('tooltip2.id', tooltip2.id);
// tooltip2.showStyles();
//console.log(tooltip2.currentPosition);
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
//const tooltipExt = 
new TooltipExt('element3');
console.log('archive', Tooltip.archive);
// console.log('tooltipExt', tooltipExt);
// console.log('TooltipExt.__proto__:', TooltipExt.__proto__);
// tooltipExt.currentPosition = 'left';
// tooltipExt.showStyles();
// console.log('TooltipExt', TooltipExt);
// console.log('tooltipExt.currentPosition', tooltipExt.currentPosition);
// console.log('tooltipExt.constructor', tooltipExt.constructor);

//var styleObj = document.styleSheets[0].cssRules[0].style;

// for(const sheet of document.styleSheets) {
//     // console.log('sheet', Array.isArray(sheet));
//     console.log('sheet', sheet);
//     const rules = sheet.cssRules;
//     const target = rules.find(rule => rule.selectorText === {}) 
// }
// console.log(styleObj.cssText);

// for (var i = styleObj.length; i--;) {
//   var nameString = styleObj[i];
//   styleObj.removeProperty(nameString);
// }

// console.log(styleObj.cssText);