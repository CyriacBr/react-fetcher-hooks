export const imports = {
  'docs/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-index" */ 'docs/index.mdx'
    ),
  'docs/hooks/use-fetcher.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-hooks-use-fetcher" */ 'docs/hooks/use-fetcher.mdx'
    ),
  'docs/hooks/use-request.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-hooks-use-request" */ 'docs/hooks/use-request.mdx'
    ),
  'docs/states/error.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-states-error" */ 'docs/states/error.mdx'
    ),
  'docs/states/loading.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-states-loading" */ 'docs/states/loading.mdx'
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
