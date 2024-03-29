// prototype getters/setters
Object.defineProperties(Tooltip.prototype, {
    // getters:
    target: {
        get() {
            return this._target;
        }
    },
    position: {
        get() {
            return this._position;
        }
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
    },
    isMount: {
        get() {
            return this._isMount;
        }
    },
    content: {
        get() {
            return this._content;
        }
    },
    // constants:
    BEFORE: {
        get() {
            return 'before';
        }
    },
    AFTER: {
        get() {
            return 'after';
        }
    },
    PREPEND: {
        get() {
            return 'prepend';
        }
    }, 
    APPEND: {
        get() {
            return 'append';
        }
    },
    AFTERBEGIN: {
        get() {
            return 'afterbegin';
        }
    },
    TOP: {
        get() {
            return 'top';
        }
    },
    BOTTOM: {
        get() {
            return 'bottom';
        }
    },
    RIGHT: {
        get() {
            return 'right';
        }
    },
    LEFT: {
        get() {
            return 'left';
        }
    },
    CONTENT: {
        get() {
            return 'Hello World !!!';
        }
    },
    TOOLTIP_CLASS: {
        get() {
            return 'tooltip';
        }
    },
    TOOLTIP_ITEM_CLASS: {
        get() {
            return 'tooltip__item';
        }
    },
    TOOLTIP_ITEM_ACTIVE_CLASS: {
        get() {
            return 'tooltip__item_active';
        }
    },
    TOOLTIP_ITEM_POSITION_CLASS: {
        get() {
            return 'tooltip__item_position_';
        }
    },
    TOOLTIP_TARGET_CLASS: {
        get() {
            return 'tooltip__target';
        }
    },
    DATA_OBJECT_REFERENCE_ATTRIBUTE: {
        get() {
            return 'data-object-reference';
        }
    }    
});

function Tooltip(id, content, position, styles = null, objectReference = null) {
    this.setTarget(id);
    this._objectReferenceValue = objectReference; // make a setter for this property
    this._styles = styles ? this.constructor.styleHyphenFormat(styles) : styles;
    this.constructor.archive.set(this, objectReference);
    // this.id = this.constructor.uid(); 
    // this.constructor.archive.set(this, this.id);
    this._createHtml();
    this.setContent(content);
    this.setPosition(position);
    this.unfreeze();
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

// Prototype properties
Tooltip.prototype._positions = new Set([Tooltip.prototype.TOP, Tooltip.prototype.BOTTOM, Tooltip.prototype.RIGHT, Tooltip.prototype.LEFT]);
Tooltip.prototype._mountInsertMethods = new Set([Tooltip.prototype.BEFORE, Tooltip.prototype.AFTER, Tooltip.prototype.PREPEND, Tooltip.prototype.APPEND]);

// Prototype methods
/**
 * Set the target element for the tooltip.
 */
Tooltip.prototype.setTarget = function(id) {
    if(typeof id !== 'string') throw new Error('The identifier must be a string type !!!');
    const newTarget = document.getElementById(`${id}`);
    if(newTarget === null) throw new Error('Invalid id, element not found !!!'); 
    // set target on initialization
    if(!this._target) {
        this._target = newTarget
        return;
    };
    if(this._target.id == id) {
        console.warn('A target with this id already exists.');
        return this;
    }
    // check for a tooltip 
    if(newTarget.closest(`.tooltip[${this.DATA_OBJECT_REFERENCE_ATTRIBUTE}]`)) {
        console.warn('The element with this id already contains a tooltip.');
        return this;
    };
    this.unmount();
    this._target = newTarget;
    // setting the initial mount point and initial mount method 
    // to undefined to trigger their redefinition in the mount method
    this._initialMountPoint = this._initialInsertMethod = undefined;
    this.mount();
    return this;
}
/**
 * Creating the tooltip HTML-skeleton and setting styles
 */
Tooltip.prototype._createHtml = function() {
    const html = `<div id=${this._id} class=${this.TOOLTIP_ITEM_CLASS}></div>
                <div class=${this.TOOLTIP_TARGET_CLASS}></div>`;
    this._tooltip = document.createElement('div');
    this._tooltip.classList.add(`${this.TOOLTIP_CLASS}`);
    this._tooltip.setAttribute(`${this.DATA_OBJECT_REFERENCE_ATTRIBUTE}`, this._objectReferenceValue);
    this._tooltip.insertAdjacentHTML(`${this.AFTERBEGIN}`, html);
    this._tooltipTarget = this._tooltip.querySelector(`.${this.TOOLTIP_TARGET_CLASS}`);
    this._tooltipItem = this._tooltip.querySelector(`.${this.TOOLTIP_ITEM_CLASS}`);
    // set tooltip styles
    if(this._styles) this._tooltipItem.style.cssText = this._styles;
}
/**
 * Set tooltip content
 */
Tooltip.prototype.setContent = function(content) {
    // set default values
    if(content === undefined || content === null) content = this.CONTENT;
    if(typeof content != 'string') throw Error('Content must be a string !!!');
    if(this._content == content) {
        console.warn('This content is already installed.');
        return this
    };
    // set content
    this._tooltipItem.textContent = content;
    this._content = content;
    return this;
}
/**
 * Set a tooltip position.
 */ 
Tooltip.prototype.setPosition = function(position) {
    // console.log('start setPosition...',this._positions)
    // set default values
    if(position === null || position === undefined) position = this.TOP;
    if(!this._positions.has(position)) throw new Error('Incorrect position !!!');
    if(this._position == position) return this;
    // change position
    // console.log('change position');
    // set position on initialization
    if(!this._tooltipItem.className.includes(`${this.TOOLTIP_ITEM_POSITION_CLASS}`)) {
        // console.log('change position by default');
        this._tooltipItem.classList.add(`${this.TOOLTIP_ITEM_POSITION_CLASS}${position}`);
        this._position = position;
        return;
    }
    // change position
    this._tooltipItem.classList.replace(`${this.TOOLTIP_ITEM_POSITION_CLASS}${this._position}`, `${this.TOOLTIP_ITEM_POSITION_CLASS}${position}`);
    // console.log(`the position has been changed from ${this._position} to ${position}`);
    this._position = position;
    return this;
}
/**
 * Mount a tooltip in the DOM.
 * You can call the method with initial parameters, for example: 
 * mount(undefined, undefined); mount(undefined, null); mount(null, null);
 * or via getters: mount(obj.initialMountPoint, obj.initialInsertMethod);
 * or without arguments: mount();
 */
Tooltip.prototype.mount = function(mountPoint, insertMethod) {
    // define initial mount point and initial insert method
    if(!this._initialMountPoint && !this._initialInsertMethod) {
        if(this._target.previousElementSibling) {
            this._initialMountPoint = this._target.previousElementSibling;
            this._initialInsertMethod = this.AFTER;
        } else {
            this._initialMountPoint = this._target.parentElement;
            this._initialInsertMethod = this.PREPEND;
        }
    }
    // setting default mount options
    if(mountPoint === null || mountPoint === undefined) mountPoint = this._initialMountPoint;
    if(insertMethod === null || insertMethod === undefined) insertMethod = this._initialInsertMethod;
    if(!this._mountInsertMethods.has(insertMethod)) throw Error('Incorrect insertion method !!!');
    // insert target into tooltip by condition
    if(!this._tooltipTarget.contains(this._target)) {
        this._tooltipTarget.append(this._target);
    }
    // insert tooltip into DOM by condition
    if(this._prevMountPoint !== mountPoint || this._prevInsertMethod !== insertMethod || !this._isMount) {
        console.log('start mount..., mountPoint', mountPoint);
        // mounting
        mountPoint[insertMethod](this._tooltip);
        this._isMount = true;
        // set previous the mount point and insert method
        if(this._prevMountPoint !== mountPoint) this._prevMountPoint = mountPoint;
        if(this._prevInsertMethod !== insertMethod) this._prevInsertMethod = insertMethod;
    }
    return this;
}
/**
 * Removing a tooltip from the DOM.
 */
Tooltip.prototype.unmount = function() {
    this._initialMountPoint[this._initialInsertMethod](this._target);
    this._tooltip.remove();
    this._isMount = false;
    // console.log('tooltip is removed', this._tooltip);    
    return null;
}
/**
 * set handlers to show and hide toolTip
 */
Tooltip.prototype.unfreeze = function() {
    this._setHandlers(this._showTooltip.bind(this), this._hideTooltip.bind(this));
    this._isFreeze = false;
    return this;
}
/**
 * disable handlers to show and hide toolTip
 */
Tooltip.prototype.freeze = function() {
    this._setHandlers(null, null);
    this._isFreeze = true;
    return this;
}
// set handlers
Tooltip.prototype._setHandlers = function(showHandler, hideHandler) {
    this._tooltipTarget.onmouseenter = showHandler;
    this._tooltipTarget.onmouseleave = hideHandler;
}
Tooltip.prototype._showTooltip = function() {
    this._tooltipItem.classList.add(`${this.TOOLTIP_ITEM_ACTIVE_CLASS}`);
}
Tooltip.prototype._hideTooltip = function () {
    this._tooltipItem.classList.remove(`${this.TOOLTIP_ITEM_ACTIVE_CLASS}`);
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
        // tolltip__item to constant
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


let obj = new Tooltip('tooltip-01', 'undefined', undefined, undefined, 'obj');
// console.log('obj.isFreeze', obj.isFreeze);
// debugger;
// obj.mount(document.querySelector('.third-element'), 'after', true);
// console.log('obj.isFreeze', obj.isFreeze);

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
