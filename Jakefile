var fs = require('fs'),
    path = require('path'),
    child = require('child_process'),
    jade = require('jade'),
    less = require('less'),
    uglify = require('uglify-js'),
    glob = require('glob');

directory('public');

file('public/index.html', ['public'], function() {
  console.log("%s -> %s", 'source/index.jade', 'public/index.html');
  fs.readFile('source/index.jade', 'utf8', function(err, data) {
    jade.render(data, {filename: "source/index.jade"}, function(err, html) {
      if (err) {
        console.error(err);
        throw new Error("jade error");
      }

      fs.writeFile('public/index.html', html, 'utf8', function(err) {
        complete();
      });
    });
  });
}, {async: true});

file('public/confuse.min.css', ['public'], function() {
  console.log("%s -> %s", 'source/confuse.less', 'public/confuse.min.css');
  fs.readFile('source/confuse.less', 'utf8', function(err, data) {
    less.render(data, {compress: true}, function(err, css) {
      if (err) {
        throw new Error("less: " + err.message);
      }

      fs.writeFile('public/confuse.min.css', css, 'utf8', function(err) {
        complete();
      });
    });
  });
}, {async: true});

file('public/confuse.min.js', ['public'], function() {
  console.log("%s -> %s", 'source/confuse.js', 'public/confuse.min.js');
  fs.readFile('source/confuse.js', 'utf8', function(err, data) {
    var ast = uglify.parser.parse(data);
    ast = uglify.uglify.ast_mangle(ast);
    ast = uglify.uglify.ast_squeeze(ast);

    fs.writeFile('public/confuse.min.js', uglify.uglify.gen_code(ast), 'utf8', function(err) {
      complete();
    });
  });
}, {async: true});

file('public/bootstrap/bootstrap.min.css', ['public'], function() {
  console.log("%s -> %s", 'vendor/bootstrap/bootstrap.min.css', 'public/bootstrap/bootstrap.min.css');
  jake.mkdirP('public/bootstrap');
  jake.cpR('vendor/bootstrap/css/bootstrap.min.css', 'public/bootstrap/bootstrap.min.css');
});

desc("Confuses everyone");
task('build', [
  'public/index.html',
  'public/confuse.min.css',
  'public/confuse.min.js',
  'public/bootstrap/bootstrap.min.css'
]);

desc("Explains everything");
task('clean', function() {
  jake.rmRf('public');
});
