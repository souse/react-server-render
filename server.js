import express from 'express';

import webpack from 'webpack';
import webpackConfig from './build/webpack.dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';

import App from './client/routes';

const app = express();
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>React Server Render Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="/main.js"></script>
      </body>
    </html>`;
}

if(process.env.NODE_ENV == 'development') {
	const compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, { 
		publicPath: webpackConfig.output.publicPath,
		stats: {
		    colors: true,
		    modules: false,
		    children: false,
		    chunks: false,
		    chunkModules: false
		}
	}));
	app.use('/static', express.static('./dist/static'));
	app.use(webpackHotMiddleware(compiler));
} else {
	// 生产环境处理...
}

app.use((req, res) => {
	const context = {};

	const html = renderToString(
		<StaticRouter location={req.url} context={context}>
	    	<App />
	    </StaticRouter>
	);

	console.log('req.url ===> ', req.url);

	if (context.url) {
		// can use the `context.status` that
  		// we added in RedirectWithStatus
		res.redirect(301, context.url);
	} else {
		console.log('200 html ---> ', html);
		res.status(200).end(renderFullPage(html, {user: null}));	
	}
	res.end();
});

const port = 3002;
const host = '127.0.0.1';

app.listen(port, host, function (err) {
	if(err){
    	console.log(err);
  	}

	console.log('app listening at http://%s:%s', host, port);
});









