# react-router-doc-title
Update page title when route changes using React Router. Also announces new title to screen reader.

**NOTE: Work in progress!**

# Requirements
Tested against:
- `react ^0.13`
- `react-router ^1.0.0-rc1`

# Usage
## 1. Add `docTitle` prop to route definitions
`routes.js`:
```javascript
<Route path="/" component={RootContainer} docTitle="Home">
  <Route path="/about" component={AboutContainer} docTitle="About"/>
  <Route path="/settings" component={SettingsContainer} docTitle="Settings">
    <Route path="section" component={SpecificSettingsContainer} docTitle="Specific Settings"/>
  </Route>
```

## 2. Add `onUpdate` handler to your client-side react-router initialization
In your client-side react-router config, add an `onUpdate` handler:

```
import routes from '../shared/routes';
import { Router } from 'react-router';
import { transitionDocTitle } from 'react-router-doc-title';

const history = createBrowserHistory();

function handleUpdate() {
  transitionDocTitle(this.state, {
    siteName: 'My App',
  });
}

React.render(<Router history={history} routes={routes} onUpdate={handleUpdate} />);
```

Wit this setup, if we navigate to `/about`, our page title will be set to `About - My App` and the screen reader will announce `About loaded`. See API below for how to customize this display.

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

##4. Add `A11yAnnouncer` component to layout
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





# API
## `transitionDocTitle(renderProps, routeTitleConfig)`
Sets the document title and announces a page transition to screen readers. Used on the client in the `onUpdate` callback of the react-router `Router`.

### Props
- `renderProps` - Object that holds render props for react-router. You can get this in the react-router `Router` `onUpdate()` callback by calling `this.state`.
- `RouteTitleConfig` - configuration object. Can accept these values:
  - `siteName` - Name of your site or app. This will be tacked on to the end of the `docTitle` separated by the `delimiter` in the document title.
  - `docTitleProp` (default: `docTitle`) - prop on react-router `Route` definition that holds the document title 
  - `delimiter` (default: `-`) - Used to separate the `docTitle` and the `siteName` in the document title
  - `shouldAnnounce` (default: `true`) - Set to `false` to prevent screen readers from announcing this page transition
  - `loadAlertPhrase` (default: `loaded`) - phrase that will be read to screen readers when announcing document title transitions, i.e. "about loaded")
  - `announceManner` (options: `assertive` | `polite`, default: `assertive`) - ARIA manner in which the page transition will be announced


## `getDocTitleFromRenderProps(renderProps, routeTitleConfig)`
Returns the title string from the deepest-nested react-router `Route` component handler. Used on the server to pull out the page title title in the `match` callback to render in a template on page load.

### Props
- `renderProps` - Object that holds render props for react-router. Get this in the `renderProps` argument in the `match` callback from react-router.
- `routeTitleConfig` - configuration object. Can accept these values:
  - `siteName` - Name of your site or app. This will be tacked on to the end of the `docTitle` separated by the `delimiter` in the document title.
  - `docTitleProp` (default: `docTitle`) - prop on react-router `Route` definition that holds the document title 
  - `delimiter` (default: `-`) - Used to separate the `docTitle` and the `siteName` in the document title

## `transitionComputedDocTitle(title, routeTitleConfig)`
Updates the page title to `title` and announces it to a screen reader. Used inside a react-router `Route` component handler when the title needs data computed inside the component handler. Add this in the `componentDidMount` lifecycle hook:

```javascript
import React from 'react';
import { transitionComputedDocTitle } from 'react-router-doc-title';
import siteTitleConfig from '../../config/siteTitle';

export default class NestedSettings extends React.Component {

  componentDidMount() {
    transitionComputedDocTitle(`${this.props.someValue} Page`, siteTitleConfig);
  }

  render() {
    return (
      <div>
        <h2>Some Specific Settings</h2>
        ...
      </div>
    );
  }
}

```

Also, do not add a `docTitle` prop to he `Route` definition when the component sets the title using `transitionComputedDocTitle` inside `componentDidMount`.

### Props
- `title` - The page title.
- `RouteTitleConfig` - configuration object. Can accept these values:
  - `siteName` - Name of your site or app. This will be tacked on to the end of the `docTitle` separated by the `delimiter` in the document title.
  - `docTitleProp` (default: `docTitle`) - prop on react-router `Route` definition that holds the document title 
  - `delimiter` (default: `-`) - Used to separate the `docTitle` and the `siteName` in the document title
  - `shouldAnnounce` (default: `true`) - Set to `false` to prevent screen readers from announcing this page transition
  - `loadAlertPhrase` (default: `loaded`) - phrase that will be read to screen readers when announcing document title transitions, i.e. "about loaded")
  - `announceManner` (options: `assertive` | `polite`, default: `assertive`) - ARIA manner in which the page transition will be announced


# Tips
- Put your `routeTitleConfig` options in their own module and include them with `transitionDocTitle`. That way you have the same config wherever you are transitioning the title.
