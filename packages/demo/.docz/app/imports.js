export const imports = {
  'docs/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-index" */ 'docs/index.mdx'
    ),
  'docs/usage/fetcher-reference.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-usage-fetcher-reference" */ 'docs/usage/fetcher-reference.mdx'
    ),
  'docs/usage/fetcher.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-usage-fetcher" */ 'docs/usage/fetcher.mdx'
    ),
}
