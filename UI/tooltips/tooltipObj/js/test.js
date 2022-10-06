let str2 = '{"color":"black","backgroundColor":"yellow","background":"blue"}'
//console.log(str2)
const regularExp = /^(?<start>{")((?<word>\w+)(?<sign>"[:,]"))+(?<word2>\w+)("})/g;
let result2 = str2.replaceAll(regularExp, (...match) => {
  let groups = match.pop();
	console.log('match', match[0]);
    console.log('groups', groups);
    // console.log('p', p);
    // console.log('p2', p2);
    // console.log('sign', group);
    // console.log('word', group.word);
    // console.log('p4', p4)
    // console.log('p5', p5)
    // console.log('p6', p6)
    // console.log('group', group)
    // let res = [p1,p2,p3].join('');
    // console.log('res', res);
    //return res;
    // ${p2=';'}
    return `${groups.start=''}${groups.word='word'}`;
    
});
console.log('result2', result2);
const res3 = str2.replaceAll(":", '&');
console.log('res3', res3);