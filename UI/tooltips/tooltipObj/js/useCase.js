// An example of using the _freeze and _unFreeze methods
const match = window.matchMedia('(max-width: 768px)');
function matchMediaHandler(x, fn, fn2, context) {
    if(x.matches) {
        console.log(true);
        document.body.style.backgroundColor = "yellow";
        // obj._freeze();
        fn.call(context);
    } else {
        console.log(false);
        document.body.style.backgroundColor = 'pink';
        fn2.call(context);
    }
}
// Call listener function at run time
matchMediaHandler(match, obj._freeze, obj._unFreeze, obj);
// Attach listener function on state changes
match.addListener(x => {
    // console.log('this in matchMediaHandler', this);
    matchMediaHandler(x, obj._freeze, obj._unFreeze, obj);
});