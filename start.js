var nproxy = require('./');

nproxy({
  timeout: 10,
  debug: false,
  rule: [
    {
      pattern: '(.*).js',      // Match url you wanna replace
      responder: '/Users/isken/projects/nproxy/test-script.js'
    },
  ]
});