# gulp-nproxy

A gulp http proxy plugin. Full support [nproxy](https://github.com/goddyZhao/nproxy) feature.

## Why NProxy

Maybe you have such question as why NProxy when we have [Fiddler](http://www.fiddler2.com/fiddler2/), [Charles](http://www.charlesproxy.com/), [Rythem](http://www.alloyteam.com/2012/05/web-front-end-tool-rythem-1/) and [Tinyproxy](https://banu.com/tinyproxy/). Yes, there is no doubt that they are all great tools, however they don't meet my requirements:

* Support Mac, Linux and Windows(especially Mac and Linux)
* Support replacing combo files with separated source files
* Support directory mapping

This is the main reason why NProxy is here. Besides, NProxy can improve the efficiency of my daily development for enterprise-level product with a bunch of complex building processes, which cost me lots of time.

I've written a post named [NProxy: The Mjolnir for UI Developers](http://en.blog.goddyzhao.me/post/29470818841/nproxy-the-mjolnir-for-ui-developers)  and a keynote [NProxy: A Sharp Weapon for UI Developers](https://speakerdeck.com/u/goddyzhao/p/nproxy-a-sharp-weapon-for-ui-developers) to explain my reason for developing NProxy in detail.

## Features

* Support Mac, Linux and Windows
* Support both single file and combo file replacing
* Support directory mapping with any files
* Support both HTTP and HTTPS

## Installation

    npm install -g gulp-nproxy (node >= v0.8.x is required)


## Usage
```
var nproxy = require('gulp-nproxy');
nproxy({
  timeout: 10, // Specify the request timeout (5 seconds by default)
  debug: false, // display debug log
  version: '', // output the version number
  port: 8989, // Specify the port nproxy will listen on(8989 by default)

  // redirect rule
  rule: [
    {
      pattern: '(.*).js',      // Match url you wanna replace
      responder: '/Users/isken/projects/nproxy/test-script.js'
    },
  ]
});
```

## Template of Replace Rule
```
[
      // 1. replace single file with local one
      {
        pattern: 'homepage.js',      // Match url you wanna replace
        responder:  "/home/goddyzhao/workspace/homepage.js"
      },

      // 2. replace single file with web file
      {
        pattern: 'homepage.js',      // Match url you wanna replace
        responder:  "http://www.anotherwebsite.com/assets/js/homepage2.js"
      },

      // 3. replace combo file with src with absolute file path
      {
        pattern: 'group/homepageTileFramework.*.js',
        responder: [
          '/home/goddyzhao/workspace/webapp/ui/homepage/js/a.js',
          '/home/goddyzhao/workspace/webapp/ui/homepage/js/b.js',
          '/home/goddyzhao/workspace/webapp/ui/homepage/js/c.js'
        ]
      },

      // 4. replace combo file with src with relative file path and specified dir
      {
        pattern: 'group/homepageTileFramework.*.js',
        responder: {
          dir: '/home/goddyzhao/workspace/webapp/ui/homepage/js',
          src: [
            'a.js',
            'b.js',
            'c.js'
          ]
        }
      },

      // 5. Map server image directory to local image directory
      {
        pattern: 'ui/homepage/img',  // must be a string
        responder: '/home/goddyzhao/image/' //must be a absolute directory path
      },

      // 6. Write responder with regular expression variables like $1, $2
      {
        pattern: /https?:\/\/[\w\.]*(?::\d+)?\/ui\/(.*)_dev\.(\w+)/,
        responder: 'http://localhost/proxy/$1.$2'
      },

      // 7. Map server image directory to local image directory with regular expression
      // This simple rule can replace multiple directories to corresponding locale ones
      // For Example,
      //   http://host:port/ui/a/img/... => /home/a/image/...
      //   http://host:port/ui/b/img/... => /home/b/image/...
      //   http://host:port/ui/c/img/... => /home/c/image/...
      //   ...
      {
        pattern: /ui\/(.*)\/img\//,
        responder: '/home/$1/image/'
      }
];
```

## License

MIT
