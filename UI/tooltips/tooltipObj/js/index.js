function Tooltip(targetId, content = 'I am tooltip', position = 'top', styles = null, objectReference) {
    this._target = document.getElementById(targetId);
    this._isFreeze = false; 
    this._content = content; 
    this._position = position; // check available position !!!
    this._objectReference = objectReference;
    this._styles = styles ? this.constructor.styleHyphenFormat(styles) : styles;
    this.constructor.archive.set(this, objectReference);
    // define mount point and insert method
    if(this._target.previousElementSibling) {
        this._initialMountPoint = this._target.previousElementSibling;
        this._initialInsertMethod = 'after';   // check the insert method, move to constant, make getter !!!
        // this._target.previousElementSibling.after(tooltip);
    } else {
        this._initialMountPoint = this._target.parentElement;
        this._initialInsertMethod = 'prepend';
    }
    this._prevMountPoint;
    this._prevInsertMethod;
    // this.id = this.constructor.uid(); 
    // this.constructor.archive.set(this, this.id);
    // this._availablePositions = new Set(['top', 'left', 'right', 'bottom']); // move it to the prototype !!!
    this.mount();
}
// static properties
Tooltip.archive = new WeakMap();
// static methods
/**
 * Generating a unique id. For more details see: 
 * https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#comment-1ol48
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
Tooltip.getObjectById = () => {
    
}
// prototype getters/setters
Object.defineProperties(Tooltip.prototype, {
    // current position getter
    currentPosition: {
        get: function() {
            // console.log(`Position value is ${this._position}`);
            return this._position;
        },
        set: function(value) {
            // check current entered position
            if(this._position === value) {
                console.log(`Position change warning: Current position - ${this._position} is equivalent to given position - ${value} !!!`);
                return;
            };
            // Check the entered keyword desrcribing the position.
            if(!this._availablePositions.has(value)) {
                let positions = '';
                this._availablePositions.forEach(value => positions += `${value} `);
                console.log(`Position change warning: Invalid position value. Must be a string containing one of the values: ${positions}`);
                return;
            };
            this._tooltipItem.classList.replace(`tooltip__item_position_${this._position}`, `tooltip__item_position_${value}`);
            // console.log(`the position has been changed from ${this._position} to ${value}`);
            this._position = value;
        },
    },
    isFreeze: {
        get() {
            return this._isFreeze;
        }
    },
    initialInsertMethod: {
        get() {
            return this._initialInsertMethod;
        }
    },
    initialMountPoint: {
        get() {
            return this._initialMountPoint;
        }
    }
});
// prototype properties
Tooltip.prototype._availablePositions = new Set(['top', 'left', 'right', 'bottom']);
Tooltip.prototype._getTooltipHtml = (id, position, content) => 
    `<div id=${id} class='tooltip__item tooltip__item_position_${position}'>
                ${content}
    </div>
    <div class='tooltip__target'></div>`;

// prototype methods
/**
 * Tooltip mounting in DOM
 */
Tooltip.prototype.mount = function(mountPoint = this._initialMountPoint, insertMethod = this._initialInsertMethod, isFreeze = this._isFreeze) {
    // make tooltip frame
    if(!this._tooltip) {
        this._tooltip = document.createElement('div');
        this._tooltip.classList.add('tooltip');
        this._tooltip.setAttribute('data-object-reference', this._objectReference);
        this._tooltip.insertAdjacentHTML('afterbegin', this._getTooltipHtml(this._id, this._position, this._content));
        this._tooltipTarget = this._tooltip.querySelector('.tooltip__target');
        this._tooltipItem = this._tooltip.querySelector('.tooltip__item');
        // set tooltip styles
        if(this._styles) this._tooltipItem.style.cssText = this._styles;
    }
    // insert target into tooltip by condition
    if(!this._tooltipTarget.contains(this._target)) {
        this._tooltipTarget.append(this._target);
    }
    // insert tooltip into DOM by condition
    // call a method with initial parameters, for example: mount(null, null, true);
    // or mount(undefined, undefined, true);
    if(mountPoint === null) mountPoint = this._initialMountPoint;
    if(insertMethod === null) insertMethod = this._initialInsertMethod;
    // check previous parameters
    if(this._prevMountPoint !== mountPoint || this._prevInsertMethod !== insertMethod) {
        // console.log('start mount..., mountPoint', mountPoint);
        // mounting
        mountPoint[insertMethod](this._tooltip);
        // set previous the mount point and insert method
        if(this._prevMountPoint !== mountPoint) this._prevMountPoint = mountPoint;
        if(this._prevInsertMethod !== insertMethod) this._prevInsertMethod = insertMethod;
    }
    // set handlers to show and hide tooltip
    if(!isFreeze) {
        this.unFreeze();
        this._isFreeze = isFreeze;
    } // check if handlers are installed !!!
    else {
        this.freeze();
        this._isFreeze = isFreeze;
    };
}
/**
 * set handlers to show and hide toolTip
 */
Tooltip.prototype.unFreeze = function() {
    this.setHandlers(this._showTooltip.bind(this), this._hideTooltip.bind(this));
}
/**
 * disable handlers to show and hide toolTip
 */
Tooltip.prototype.freeze = function() {
    this.setHandlers(null, null);
}
// set handlers
Tooltip.prototype.setHandlers = function(showHandler, hideHandler) {
    this._tooltipTarget.onmouseenter = showHandler;
    this._tooltipTarget.onmouseleave = hideHandler;
    // console.log('this._tooltipTarget.onmouseenter', this._tooltipTarget.onmouseenter);
}
Tooltip.prototype._showTooltip = function() {
    this._tooltipItem.classList.add('tooltip__item_active');
}
Tooltip.prototype._hideTooltip = function () {
    this._tooltipItem.classList.remove('tooltip__item_active');
}
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


let obj = new Tooltip('tooltip-01', 'Hello I am Tooltip', 'left', null, 'obj');
console.log('obj.isFreeze', obj.isFreeze);
// debugger;
// obj.mount(document.querySelector('.third-element'), 'after', true);
console.log('obj.isFreeze', obj.isFreeze);

// new Tooltip('tooltip-02', 'Hello I am Tooltip 2', 'right', {
//         backgroundColor: 'green', 
//         color: 'orange',
//         borderBottom: '2px solid red',
//         borderTop: '4px dashed blue',
//     }); 

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

// console.log('archive', Tooltip.archive);
// console.log(Tooltip.archive.get(obj));
