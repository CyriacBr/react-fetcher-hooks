export default {
  title: 'Use Fetcher',
  typescript: true,
  themeConfig: {
    styles: {
      page: {
        background: '#f2f2f2'
      }
    }
  },
  modifyBundlerConfig: bundlerConfig => {
    const rules = [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ];
    bundlerConfig.module.rules.push(...rules);
    return bundlerConfig;
  },
  htmlContext: {
    head: {
      links: [{
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.7/css/all.css'
      }]
    }
  },
}