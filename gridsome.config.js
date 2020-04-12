// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: "Cybercode",
    siteUrl: "https://cybercoder.io",
    siteDescription: "Fun programming tutorials in future 🚀",
    icon: "src/favicon.png",
    transformers: {
        remark: {
            plugins: [
                '@gridsome/remark-prismjs'
            ]
        },
    },
    plugins: [
        {
            use: "@gridsome/source-filesystem",
            options: {
                path: "blog/**/*.md",
                typeName: "Post"
            },
        },
        {
            use: "gridsome-plugin-tailwindcss"
        },
        {
            use: '@gridsome/plugin-google-analytics',
            options: {
              id: 'UA-86432918-5'
            }
        }
    ]
}
