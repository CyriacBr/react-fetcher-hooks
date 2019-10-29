const { mergeWith } = require('lodash/fp')

let custom
try {
  custom = require('./gatsby-config.custom')
} catch (err) {
  custom = {}
}

const config = {
  pathPrefix: '/react-fetcher-hooks/',

  siteMetadata: {
    title: 'Fetcher Hookds',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: { styles: { page: { background: '#f2f2f2' } } },
        themesDir: 'src',
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: true,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        port: 4838,
        p: 4838,
        root:
          '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz',
        base: '/react-fetcher-hooks/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Fetcher Hookds',
        description: 'My awesome app using docz',
        host: 'localhost',
        separator: '-',
        paths: {
          root:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo',
          templates:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/node_modules/docz-core/dist/templates',
          packageJson:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/package.json',
          docz:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz',
          cache:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz/.cache',
          app:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz/app',
          appPublic:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz/public',
          appNodeModules:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/node_modules',
          appPackageJson:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/package.json',
          appYarnLock:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/node_modules/docz-core/yarn.lock',
          ownNodeModules:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/node_modules/docz-core/node_modules',
          gatsbyConfig:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/gatsby-config.js',
          gatsbyBrowser:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/gatsby-browser.js',
          gatsbyNode:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/gatsby-node.js',
          gatsbySSR:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/gatsby-ssr.js',
          importsJs:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz/app/imports.js',
          rootJs:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz/app/root.jsx',
          indexJs:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz/app/index.jsx',
          indexHtml:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz/app/index.html',
          db:
            '/media/cyriac/0CC5166B0CC5166B/Work/react-fetcher-hooks/packages/demo/.docz/app/db.json',
        },
        htmlContext: {
          head: {
            links: [
              {
                rel: 'stylesheet',
                href: 'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
              },
            ],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
