{
    plugins: [
      new StaticSiteGeneratorPlugin({
        crawl: true
      })
    ]
  }

  import path from 'path'

// ...
{
  entry: 'index.js',
  output: {
    filename: 'index.js',
    path: path.resolve('dist'),
    libraryTarget: 'umd'
  }
}