# injectjscss-template-html-webpack-plugin

> replace html-webpack-plugin generated js, css path

> webpack1+

## install

```sheel
npm install injectjscss-template-html-webpack-plugin
or
yarn add injectjscss-template-html-webpack-plugin
```

## use

```js
const injectJsCssTemplateHtmlWebpackPlugin  = require('injectjscss-template-html-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
/* webpack config add */
plugin: [
  new htmlWebpackPlugin({....}),

  new injectJsCssTemplateHtmlWebpackPlugin(options), // this must be behind the html-webpack-plugin

  ....
]
```

## options

> Object or Array

-   injectTemplateId  - number
    > when html-wepack-plugin is multiple, injectJsCssTemplateHtmlWebpackPlugin will through injectTemplateId match, and the options must be Array.
    > html-webpack-plugin option must add the same injectTemplateId
    > example:
```js
plugin: [
      new htmlWebpackPlugin({
        injectTemplateId: 0,
        ....
      }),
      new htmlWebpackPlugin({
        injectTemplateId: 1,
        ....
      }),
      new injectJsCssTemplateHtmlWebpackPlugin([{
        injectTemplateId: 0,
        ...
      },{
        injectTemplateId: 1,
        ...
      }])
]
```

-   jstemplate   - function

```js
function(everypath){
    .....
    return path;
}
```

-   csstemplate   - function

```js
function(everypath){
    .....
    return path;
}
```
