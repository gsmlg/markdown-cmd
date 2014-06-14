var marked = exports.marked = require('marked'),
    hljs = exports.hljs = require('highlight.js');

marked.setOptions({
    highlight: function(code, lang, callback){
        if (lang) {
            return hljs.highlight(code, lang).value;
        } else {
            return hljs.highlightAuto(code).value;
        }
    }
});
