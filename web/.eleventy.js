const eleventyPluginSyntaxHighlighter = require('@11ty/eleventy-plugin-syntaxhighlight');
module.exports = function (eleventyConfig) {


    eleventyConfig.addPlugin(eleventyPluginSyntaxHighlighter);
    const highlighter = eleventyConfig.markdownHighlighter;
    eleventyConfig.addMarkdownHighlighter((str, language) => {
        if (language === "mermaid") {
            return `<pre class="mermaid">${str}</pre>`;
        }
        return highlighter(str, language);
    });

//Make [[link]] into a link
    eleventyConfig.addFilter('link', function (str) {
        return str.replace(/\[\[(.*?)\]\]/g, '<a href="/notes/$1">$1</a>');
    })
    eleventyConfig.addPassthroughCopy('src/site/styles')

    // make the seed target act like prod
    return {
        dir: {
            input: "src/site",
            output: "dist",
            data: `_data`
        },
        templateFormats : ["njk", "md", "11ty.js", "css"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        passthroughFileCopy: true
    };

};