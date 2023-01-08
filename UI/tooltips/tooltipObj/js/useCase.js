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

// Examples of using the Tooltip constructor.

// An example of using the freeze and unfreeze methods
// Setting prohibition and permission to show hints
// Call listener function at run time
// matchMediaHandler(matchMD_768, obj.freeze, obj.unfreeze, obj);
// Attach listener function on state changes
matchMD_768.addListener(x => {
    // matchMediaHandler(x, obj.freeze, obj.unfreeze, obj);
});

// To select a particular use case, comment or uncomment appropriate lines.  
matchMD_450.addListener(x => {
    if(x.matches) {
        // An example of using mount and freeze methods together: 
        
        // obj.mount(document.querySelector('.third-element'), 'after').freeze();
        
        // An example of usin the mount method:
            // * You can call the method with initial parameters, for example: 
            // * mount(undefined, undefined); mount(undefined, null); mount(null, null);
            // * or via getters: mount(obj.initialMountPoint, obj.initialInsertMethod);
            // * or without arguments: mount();
            // * insertion methods (defined as getters on the prototype): 
            // * obj.BEFORE, obj.AFTER, obj.PREPEND, obj.APPEND
        // obj.mount();    
        // obj.mount(document.querySelector('.second-element'), 'after');
            // incorrect insertion method
        obj.mount(null, obj.APPEND);
        // An example of using the unmount method:
            // remove tooltip from DOM:
        // obj.unmount();
            // remove tooltip from DOM and memory:
        // console.log('obj', obj);
        // obj = obj.unmount();
        // console.log('obj', obj);

    
    } else {
        // An example of using mount and freeze methods together: 
        
        // An example of usin the mount method:
        // obj.mount(obj._mountPoint, obj._insertMethod);
        // obj.mount(document.querySelector('.second-element'), 'after');
        // obj.mount(document.querySelector('.third-element'), 'after');
        // obj.mount(undefined, null).unfreeze();
        // obj.mount(undefined, 'before');
        // obj.mount();
    }
});


