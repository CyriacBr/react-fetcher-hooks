export const imports = {
  'docs/_examples.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-examples" */ 'docs/_examples.mdx'
    ),
  'docs/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-index" */ 'docs/index.mdx'
    ),
}
