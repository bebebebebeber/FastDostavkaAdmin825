import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../navs/_moderatorNavs';
// routes config
import routes from '../../Routes/moderator_routes';

import "./sideBarStyle.css";

//const DefaultFooter = React.lazy(() => import('./DefaultFooter'));


class StudentSideBar extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  

  render() {
    console.log("side")
    return (
      // <div className="app">
       
        <div className="back-image app-body">
          <AppSidebar  fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/404" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>        
      // </div>
    );
  }
}

export default StudentSideBar;
