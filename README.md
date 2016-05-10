# angular-starter [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> Generator to fast start project with angular, webpack, postcss+sugarss, babel, eslint


## Installation

First, install [Yeoman](http://yeoman.io) and generator-as using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g generator-as yo
```

Then generate your new project:

```bash
yo as project-name
```


## Modern stack
TODO
Node v6 required


## All-in-JS
TODO


## PostCSS
[PostCSS][postcss-url] is great tool to work with CSS.  
There are indert-base [SugarSS][sugarss-url] syntax in this boilerplate.  
It is used [precss][precss-url] and [postcss-cssnext][postcss-cssnext-url] to process CSS.  
It is used to lint and autoformat CSS by [stylelint][stylelint-url] and [stylefmt][stylefmt-url].

## Styleguide generator
TODO


## Hot module replacement
Maybe it is possible I should try to implement it.


## Yeoman generator
Automate routine with yeoman generator.
Just use these commands:

Create project:
```bash
yo as [PROJECT]
```

Add component:
```bash
yo as:component [--no-styles] [COMPONENT]
```

Add directive:
```bash
yo as:directive [DIRECTIVE]
```

Add filter:
```bash
yo as:filter [FILTER]
```

Add page:
```bash
yo as:page [--url URL] [STATE]
```

Add service:
```bash
yo as:service [SERVICE]
```


## Separate modules for configs
TODO


## Recommended tools
> easy ➞ hard to learn  
> 🌕🌖🌗🌘🌑

- [EditorConfig](http://editorconfig.org) 🌕
- [Eslint integration for your editor](http://eslint.org/docs/user-guide/integrations#editors) 🌗


## License

MIT © [Maxim Samoilov](https://twitter.com/_nitive)

[npm-image]: https://badge.fury.io/js/generator-as.svg
[npm-url]: https://npmjs.org/package/generator-as
[travis-image]: https://travis-ci.org/Nitive/angular-starter.svg?branch=master
[travis-url]: https://travis-ci.org/Nitive/angular-starter

[postcss-url]: https://github.com/postcss/postcss
[precss-url]: https://github.com/jonathantneal/precss
[postcss-cssnext-url]: http://cssnext.io
[stylelint-url]: https://github.com/stylelint/stylelint
[stylefmt-url]: https://github.com/morishitter/stylefmt
[sugarss-url]: https://github.com/postcss/sugarss
