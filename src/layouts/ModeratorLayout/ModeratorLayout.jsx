import React, { Component, Suspense } from 'react';
import SideBar from "./ModeratorSideBar";
import {Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import get from "lodash.get";
import {serverUrl} from '../../config';
import { logout } from '../../Views/defaultViews/LoginPage/reducer';
import {
  AppHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

const ModeratorNavbar = React.lazy(() => import('./ModeratorNavbar'));
class ModeratorLayout extends React.Component {
    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //   }

    signOut(e) {
      e.preventDefault()
      this.props.logout();
      this.props.history.push('/')
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
render() {
    const { login } = this.props;
    console.log("core",login);
    let isAccess = false;
    if(login.isAuthenticated===undefined){
        return (
            <Redirect to="/" />  
          );
    }
    if(login.isAuthenticated)
    {
      const { roles } = login.user;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'Admin')
          isAccess = true;
      }
    }
    const content = (
      <div className="app">
         <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <ModeratorNavbar onLogout={e=>this.signOut(e)}
                            image={`${serverUrl}UsersImages/50_${login.user.image}`}/>
          </Suspense>
        </AppHeader>
        <SideBar></SideBar>
      </div>
        
    )
    return (
      isAccess ? 
      content
        : <Redirect to="/" />  
    );
  }
}
const mapStateToProps = (state) => {
    return {
      login: get(state, 'login')
    };
  }
  
  export default connect(mapStateToProps, { logout }) (ModeratorLayout);

