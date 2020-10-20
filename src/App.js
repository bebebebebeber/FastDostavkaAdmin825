import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import './scss/style.scss';

//layouts
const ModeratorLayout=React.lazy(()=>import("./layouts/ModeratorLayout/ModeratorLayout"));
//pages
const Login = React.lazy(() => import("./Views/defaultViews/LoginPage/LoginPage.js"));
export default class App extends Component {
  static displayName = App.name;

  render() {
    return (        
          <Router>  
      <Suspense fallback={ <div className="animated fadeIn pt-1 text-center">Loading...</div> }>
        <Switch>
          <Route exact path="/" name="Login" render={ props => <Login { ...props } /> } />
          <Route path="/admin" name="Moderator" render={ props => <ModeratorLayout { ...props } /> } />
          {/* <Route path="/404" name="404" render={ props => <Error { ...props } /> } /> */}
        </Switch>
      </Suspense>
      </Router> 

    );
  }
}
