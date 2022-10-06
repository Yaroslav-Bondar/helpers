console.log('RegExp time execution:');
let styles3 = new function() {
    this.color = 'black';
    this.backgroundColor = 'yellow';
    this.MozilaProperty = 'esk';
}
console.time('doSomething')

let str3 = JSON.stringify(styles3);
let output3 = str3.replace(/[{"}]/g, '')
				.replace(/,/g, ';')
                .replace(/[A-Z]/g, upper => '-' + upper.toLowerCase()) + ';';
console.log('output3', output3);
console.timeEnd('doSomething')