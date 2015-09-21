import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../../webpack.config.dev';

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  stats: false,
});

server.listen(8081, 'localhost', function listen() {});
