# angular-starter [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> Generator to fast start project with angular, webpack, postcss+sugarss, babel, eslint


## Installation

First, install [Yeoman](http://yeoman.io) and generator-as using [npm](https://www.npmjs.com/)
(You **must** use **[Node.js](https://nodejs.org/) v6**).

```bash
npm install -g generator-as yo
```

Then generate your new project:

```bash
yo as project-name
```


## Modern stack
This boilerplate use this technologies:

- Node.js v6 (You **must** use **v6**)
- Webpack
- PostCSS
- Angular
- Babel
- Eslint



## PostCSS
[PostCSS][postcss-url] is great tool to work with CSS.  
There are indert-base [SugarSS][sugarss-url] syntax in this boilerplate.  
It is used [precss][precss-url] and [postcss-cssnext][postcss-cssnext-url] to process CSS.  
It is used to lint and autoformat CSS by [stylelint][stylelint-url] and [stylefmt][stylefmt-url].


## Styleguide generator
It is generated styleguide for components from `README.md` files.
See `/styleguide` page in your application.
![styleguide screenshot](http://s.csssr.ru/2016-05-22-2056-xjinitj4jj.png)


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
Important part of the boilerplate all configs are splitted to modules.
So they can update automatically by running `npm update`.
For extending webpack config used special [wpk-manager](https://github.com/Nitive/wpk-manager) syntax.


## Best practies
#### Use components
Avoid using jade mixins, use angular components instead.
Angular components more flexible and reusable.

#### Use local reset
Use local css reset by `all: initial` in css.
It helps share code between projects.


## Recommended tools
> easy ➞ hard to learn  
> 🌕🌖🌗🌘🌑

- [EditorConfig](http://editorconfig.org) 🌕
- [Eslint integration for your editor](http://eslint.org/docs/user-guide/integrations#editors) 🌗
- [Babel](http://babeljs.io) 🌗
- Local css reset by `all: initial` 🌘


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
