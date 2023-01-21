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
        // obj.mount(document.querySelector('.second-element'), 'after');
        // obj.mount();    
            // incorrect insertion method
        // obj.mount(null, 'ddfd');
        // obj.mount(null, obj.BEFORE);

        // An example of using the unmount method:
            // remove tooltip from DOM:
        // obj.unmount();
            // remove tooltip from DOM and memory:
        // console.log('obj', obj);
        // obj = obj.unmount();
        // console.log('obj', obj);

        // An example of using the position setting method:
        // obj.setPosition('bottom');
        // obj.setPosition(null).setPosition('bottom').setPosition('bottom').setPosition('4');
        // obj.mount(null, obj.BEFORE).setPosition(obj.BOTTOM);
        // obj.mount(null, obj.BEFORE).setPosition(null);
        // obj.mount(null, obj.BEFORE).setPosition('wrong position');

        // An example of using the content setting method:
        // obj.setContent().setContent();
        // obj.setContent('Yahoo').setContent('Yahoo').setContent().setContent(4);
        
        // An example of usin the target setting method:
            // wrong id
        // obj.setTarget(4);
            // same id
        obj.setTarget('tooltip-01').setTarget('tooltip-01');
            // non-existent id
        // obj.setTarget('tooltip-01');
        // obj.setTarget(undefined)
            // other target
        // obj.setTarget('tooltip-03');
        // obj.setTarget('tooltip-03').setTarget('tooltip-03');
            // chain call
        // obj.setTarget('tooltip-03').setTarget('tooltip-03');
        obj.setTarget('tooltip-02')
            .mount(document.querySelector('.container2'), 'before')
            .setContent('3').setPosition('right');
    } else {
        // An example of using mount and freeze methods together: 
        
        // An example of usin the mount method:
        // obj.mount(obj._mountPoint, obj._insertMethod);
        // obj.mount(document.querySelector('.second-element'), 'after');
        // obj.mount(document.querySelector('.third-element'), 'after');
        // obj.mount(undefined, null).unfreeze();
        // obj.mount(undefined, 'before');
        // obj.mount();

        // An example of removing a tooltip:
    }
});


