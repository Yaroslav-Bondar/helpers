// Use case examples

const matchMD_768 = window.matchMedia('(max-width: 768px)');

const matchMD_450 = window.matchMedia('(max-width: 450px)');

function matchMediaHandler(x, fn, fn2, context) {
    if(x.matches) {
        // console.log(true);
        document.body.style.backgroundColor = "yellow";
        fn.call(context);
    } else {
        // console.log(false);
        document.body.style.backgroundColor = 'pink';
        fn2.call(context);
    }
}

// An example of using the freeze and unFreeze methods
// Setting prohibition and permission to show hints

// Call listener function at run time
matchMediaHandler(matchMD_768, obj.freeze, obj.unFreeze, obj);
// Attach listener function on state changes
matchMD_768.addListener(x => {
    // console.log('this in matchMediaHandler', this);
    matchMediaHandler(x, obj.freeze, obj.unFreeze, obj);
});


// An example of using the mount method
// Change the positions of the tooltip (set in the constructor) in the DOM tree
// Setting prohibition and permission to show hints (using freeze/unFreeze methods)
matchMD_450.addListener(x => {
    if(x.matches) {
        obj.mount(document.querySelector('.third-element'), 'after', true);
    } else {
        // obj.mount(obj._mountPoint, obj._insertMethod, false);
        // obj.mount(document.querySelector('.second-element'), 'before', false);
        // obj.mount(document.querySelector('.third-element'), 'after', true);
        // call a method with initial parameters, for example: mount(null, null, true);
        // or mount(undefined, undefined, true);
        obj.mount(undefined, null, false);
        // obj.mount(undefined, 'before', false);
    }
});


