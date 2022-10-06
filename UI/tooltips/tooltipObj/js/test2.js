console.log('loop time execution:');
console.time('doSomething')
// let styles = new function() {
//     this.color = 'black';
//     this.backgroundColor = 'yellow';
//     this.MozilaProperty = 'esk';
// }

const testReg = /[A-Z]/g;
let output4 = '';
    for(let prop in styles3) {
        if(Object.hasOwn(styles, prop)) {
            let normalizeProp = prop;
            if(prop.search(testReg) !== -1) {
            	normalizeProp = prop.replace(testReg, upperCase => `-${upperCase.toLowerCase()}`)
            }
            output4 += `${normalizeProp}:${styles[prop]};`
        }
    }
console.log('output4: ', output4) 
console.timeEnd('doSomething')