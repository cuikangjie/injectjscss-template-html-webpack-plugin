function injectJsCssTemplateHtmlWebpackPlugin(options) {
    // Configure your plugin with options...
    this.options = options;
}

function throwError(err) {
    throw new Error(err + '\n - injectJsCssTemplateHtmlWebpackPlugin')
};


injectJsCssTemplateHtmlWebpackPlugin.prototype.template = function (option, htmlPluginData) {
    let js = htmlPluginData.assets.js;
    let css = htmlPluginData.assets.css;
    // let htmlPluginDataOptions = htmlPluginData.plugin.options;

    // const id = htmlPluginDataOptions.id;

    let self_option = option;

    if (self_option.jstemplate instanceof Function) {
        js = js.map(self_option.jstemplate);
    } else {
        throwError('jstemplate must be a function')
    }

    if (self_option.csstemplate instanceof Function) {
        css = css.map(self_option.csstemplate);
    } else {
        throwError('csstemplate must be a function')
    }

    htmlPluginData.assets.js = js;
    htmlPluginData.assets.css = css;

    return htmlPluginData;
}

injectJsCssTemplateHtmlWebpackPlugin.prototype.apply = function (compiler) {

    var self = this;

    if (compiler.hooks) {
        // webpack 4 support
        compiler.hooks.compilation.tap('injectJsCssTemplateHtmlWebpackPlugin', function (compilation) {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('injectJsCssTemplateHtmlWebpackPlugin', function (htmlPluginData, callback) {
                var thatOptions = htmlPluginData.plugin.options;

                if (self.options instanceof Array && self.options.length > 0) {
                    // 多个html
                    const injectTemplateId = thatOptions.injectTemplateId;

                    let options = self.options.filter(function (item) {
                        return item.injectTemplateId == injectTemplateId;
                    });
                    if (options.length > 0) {
                        let self_option = options[0];
                        htmlPluginData = self.template(self_option, htmlPluginData);
                    }
                } else {
                    htmlPluginData = self.template(self.options, htmlPluginData);
                }
                callback();
            });
        });
    } else {
        // Hook into the html-webpack-plugin processing
        compiler.plugin('compilation', function (compilation) {
            compilation.plugin('html-webpack-plugin-before-htm-processing', function (htmlPluginData, callback) {
                var thatOptions = htmlPluginData.plugin.options;

                if (self.options instanceof Array && self.options.length > 0) {
                    // 多个html
                    const injectTemplateId = thatOptions.injectTemplateId;

                    let options = self.options.filter(function (item) {
                        return item.injectTemplateId == injectTemplateId;
                    });
                    if (options.length > 0) {
                        let self_option = options[0];
                        console.log(injectTemplateId);
                        htmlPluginData = self.template(self_option, htmlPluginData);
                    }
                } else {
                    htmlPluginData = self.template(self.options, htmlPluginData);
                }
                callback();
            });
        });
    }
}

module.exports = injectJsCssTemplateHtmlWebpackPlugin;