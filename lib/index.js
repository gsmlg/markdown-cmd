var fs = require('fs'),
    path = require('path'),
    marked = exports.marked = require('marked'),
    hljs = exports.hljs = require('highlight.js');

var renderer = new marked.Renderer();

renderer.code = function(code, language) {
    try {
        return '<pre class="hljs"><code class="language-'+language+'">'+
            (language ? hljs.highlight(language, code).value : hljs.highlightAuto(code).value)+
            '</code></pre>';
    } catch (e) {
        return '<pre class="hljs"><code class="language-auto">'+
            (hljs.highlightAuto(code).value)+
            '</code></pre>';
    }
};

marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

var codeThemeDir = fs.realpathSync(path.join(__dirname, 'code-theme'));

var codeThemeFiles = fs.readdirSync( codeThemeDir );

var codeThemes = [],
    codeThemeCss = {};

codeThemeFiles.forEach(function(name){
    if (path.extname(name) === '.css') {
        var theme = name.replace(/\.css$/, '');
        codeThemes.push(theme);
        codeThemeCss[theme] = path.join(codeThemeDir, name);
    }
});

exports.codeThemes = codeThemes;
exports.codeThemeCss = codeThemeCss;
exports.codeDefaultTheme = 'tomorrow-night';

exports.html = fs.readFileSync(path.join(__dirname, 'html', 'html5.html'), 'utf8');
