

## links:
  - https://developer.mozilla.org/ru/docs/Web/API/Element/getAttribute
  - https://developer.mozilla.org/ru/docs/Web/API/Element/setAttribute
  - https://www.w3schools.com/jsref/prop_html_style.asp
  - https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  - https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  - https://learn.javascript.ru/weakmap-weakset
  - https://stackoverflow.com/questions/28814585/how-to-check-if-type-is-boolean
  - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  - https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave
  - ### Sandboxes:
    - https://jsfiddle.net/Yaroslav_Bondar/gkp9u5qc/3/
  - ### Uid generation:
    - https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13
    - https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#comment-1ol48
  - ### Tooltips tasks:
    - https://learn.javascript.ru/task/behavior-nested-tooltip
    - https://learn.javascript.ru/task/behavior-tooltip
    - https://learn.javascript.ru/mousemove-mouseover-mouseout-mouseenter-mouseleave#umnaya-podskazka

## Code examples:

function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get: function() {
      console.log('get!');
      return temperature;
    },
    set: function(value) {
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]
