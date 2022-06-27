{
    // eslint-disable-next-line no-unused-labels
    module: {
      // eslint-disable-next-line no-unused-labels
      rules: [
        // ... other rules omitted
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[hash:base64:8]'
              }
            }
          ]
        }
      ]
    }
  }