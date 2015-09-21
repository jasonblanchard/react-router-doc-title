import 'babel/polyfill';
import env from '../../env.json';
import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../shared/configureStore';
import initialState from './fixtures/initialStateFixture';
import routes from '../shared/routes';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import { getDocTitleFromRenderProps } from 'react-router-doc-title';
import siteTitleConfig from '../config/siteTitle';

const config = env[process.env.NODE_ENV || 'development'];
const PORT = process.env.PORT || 8080;

const data = initialState;

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/*', (req, res) => {
  const store = configureStore(initialState);

  const location = createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const documentTitle = getDocTitleFromRenderProps(renderProps, siteTitleConfig);

    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps === null) {
      res.status(404).send('Not found');
    } else {
      const markup = React.renderToString(
        <Provider store={store}>
          {() => <RoutingContext {...renderProps}/>}
        </Provider>
      );

      res.render('index', {
        markup: markup,
        initialState: JSON.stringify(data),
        scriptSource: config.SCRIPT_SOURCE,
        documentTitle: documentTitle,
      });
    }
  });
});

app.listen(PORT);
