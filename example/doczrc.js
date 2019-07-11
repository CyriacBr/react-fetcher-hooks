export default {
  modifyBundlerConfig: bundlerConfig => {
    const rules = [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ];
    bundlerConfig.module.rules.push(...rules);
    return bundlerConfig;
  }
}