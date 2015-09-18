# eact-router-doc-title
Update page title when route changes using React Router. Also announces new title to screen reader.

**NOTE: Work in progress!**

# Usage
## 1. Add `docTitle` prop to route definitions
`routes.js`:
```javascript
<Route path="/" component={RootContainer} docTitle="Home - My App">
  <Route path="/about" component={AboutContainer} docTitle="About - My App"/>
  <Route path="/settings" component={SettingsContainer} docTitle="Settings - My App">
    <Route path="section" component={SpecificSettingsContainer} docTitle="Specific Settings - My App"/>
  </Route>
```

## 2. Add `onUpdate` handler to your client-side react-router initialization
In your client-side react-router config, add an `onUpdate` handler:

```
import routes from '../shared/routes';
import { Router } from 'react-router';
import { transitionTitle } from 'react-router-doc-title';

const history = createBrowserHistory();

function handleUpdate() {
  transitionTitle(this.state);
}

React.render(<Router history={history} routes={routes} onUpdate={handleUpdate} />);
```

##n. Add `A11yAnnouncer` component to layout
In your layout or root container, add the `<A11yAnnouncer>` container to hold screen reader announcements.

`RootContainer.js`:
```javascript
import React from 'react';
import { A11yAnnouncer } from 'react-router-doc-title';

export default class RootContainer extends React.Component {
  render() {
    return (
      <div>
        <A11yAnnouncer />
        <h1>My App</h1>
        ...
      </div>
    );
  }
}
```

## 3. Initialize title on server (for universal apps)
Get the title from `renderProps` and set it in your template. Here's an example using Express and Handlebars:

`server.js`:
```javascript
import express from 'express';
import exphbs from 'express-handlebars';
import React from 'react';
import routes from '../shared/routes';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import RootContainer from '../shared/containers/RootContainer';
import { getDocTitleFromRenderProps } from 'react-router-doc-title';

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

...

app.get('/*', (req, res) => {
  const location = createLocation(req.url);
  
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    const documentTitle = getDocTitleFromRenderProps(renderProps);
    
    const markup = React.renderToString(
      <Provider store={store}>
        {() => <RoutingContext {...renderProps}/>}
      </Provider>
    );
    
    res.render('index', {
      markup: markup,
      documentTitle: documentTitle,
    });
  });
});
```

`index.handlebars`:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>{{documentTitle}}</title>
  </head>
  <body>
    <div id='app'>{{{markup}}}</div>
  </body>
</html>
```
