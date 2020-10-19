import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Cookies from 'universal-cookie';
import './scss/style.scss';

//layouts
const ModeratorLayout=React.lazy(()=>import("./layouts/ModeratorLayout/ModeratorLayout"));
//pages
const Login = React.lazy(() => import("./Views/defaultViews/LoginPage/LoginPage.js"));
export default class App extends Component {
  static displayName = App.name;

  render() {
    const cookies = new Cookies();
    let themeCookies = cookies.get('theme');
    if(themeCookies===undefined){
      themeCookies='light';
      cookies.set('theme', 'light', { path: '/' });
    }
    else if (themeCookies!="light" && themeCookies!="dark"){
      themeCookies='light';
      cookies.set('theme', 'light', { path: '/' });
    }
    themeCookies=='light'? document.body.classList.add("white-content") : document.body.classList.remove("white-content");
    const theme =
      createMuiTheme({
        palette: {
          type: themeCookies,
        },
      })
      ;
    
      let lang = cookies.get('lang');
      if(lang===undefined){
        cookies.set('lang', 'en', { path: '/' });
      }
      console.log(themeCookies)
    return (
      <ThemeProvider  theme={theme}>          
          <Router>  
      <Suspense fallback={ <div className="animated fadeIn pt-1 text-center">Loading...</div> }>
        <Switch>
          <Route exact path="/" name="Login" render={ props => <Login { ...props } /> } />
          <Route path="/admin" name="Moderator" render={ props => <ModeratorLayout { ...props } /> } />
          {/* <Route path="/404" name="404" render={ props => <Error { ...props } /> } /> */}
        </Switch>
      </Suspense>
      </Router> 
      </ThemeProvider>

    );
  }
}
