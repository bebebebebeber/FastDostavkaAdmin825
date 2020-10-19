import update from "../../../helpers/update";
import LoginService from "./LoginService";
import isEmpty from "lodash/isEmpty";
import setAuthorizationToken from "../../../utils/setAuthorizationToken";
import jwt from "jsonwebtoken";
import redirectStatusCode from "../../../services/redirectStatusCode";
import { push } from "connected-react-router";
import Cookies from "universal-cookie";

export const LOGIN_POST_STARTED = "login/LOGIN_POST_STARTED";
export const LOGIN_POST_SUCCESS = "login/LOGIN_POST_SUCCESS";
export const LOGIN_POST_FAILED = "login/LOGIN_POST_FAILED";
export const LOGIN_SET_CURRENT_USER = "login/SET_CURRENT_USER";

const initialState = {
  post: {
    loading: false,
    success: false,
    failed: false,
    errors: {}
  },
  isAuthenticated: false,
  user: {
    id: "",
    name: "",
    image: "",
    roles: []
  }
};

export const loginReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case LOGIN_POST_STARTED: {
      newState = update.set(state, "post.loading", true);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors", {});
      newState = update.set(newState, "post.failed", false);
      break;
    }
    case LOGIN_SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    }
    case LOGIN_POST_SUCCESS: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.failed", false);
      newState = update.set(newState, "post.errors", {});
      newState = update.set(newState, "post.success", true);
      break;
    }
    case LOGIN_POST_FAILED: {
      newState = update.set(state, "post.loading", false);
      newState = update.set(newState, "post.success", false);
      newState = update.set(newState, "post.errors", action.errors);
      newState = update.set(newState, "post.failed", true);
      break;
    }
    default: {
      return newState;
    }
  }

  return newState;
};

export const login = model => {
  return dispatch => {
    dispatch(loginActions.started());
    LoginService.login(model)
      .then(
        response => {
          dispatch(loginActions.success());
          loginByJWT(response.data, dispatch);
          const pushUrl = getUrlToRedirect();   
          dispatch(push(pushUrl));
        },
        err => {
          throw err;
        }
      )
      .catch(err => {

        dispatch(loginActions.failed(err.response));
        redirectStatusCode(err.response);
      });
  };
};
export const refresh = () => {
  
  return dispatch => {
    dispatch(loginActions.started());
    console.log("refr");
    LoginService.refresh({token: localStorage.getItem("jwtToken"),refreshToken:localStorage.getItem("refreshToken")})
      .then(
        response => {
          dispatch(loginActions.success());
          loginByJWT(response.data, dispatch);
        },
        err => {
          throw err;
        }
      )
      .catch(err => {
        dispatch(loginActions.failed(err.response));
      });
  };
};

export function getUrlToRedirect() {
  var user = jwt.decode(localStorage.jwtToken);
  
  let roles =[];
  if(jwt.decode(localStorage.jwtToken)!==null){
    let path = "";
    const cookies = new Cookies();
    // if(cookies.get("layout")=="dev"){
    //   path = "/developer";;
    // }
    // else{
    //   path = "/customer"
    // }
    //   console.log(user);
  let roles = user.roles;
  if (Array.isArray(roles)) {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] == "Admin") {
        path = "/admin";
        break;
      }
      else if (roles[i] == "Moderator") {
        path = "/moderator";
        break;
      }
      // else if (roles[i] === "Student") {
      //   path = "/student";
      //   break;
      // } else if (roles[i] === "StudyRoomHead") {
      //   path = "/manager/profile";
      //   break;
      // } else if (roles[i] === "Teacher") {
      //   path = "/teacher";
      //   break;
      // }else if(roles[i]==="Curator"){
      //   path="/teacher";
      //   break;
      // }
    }
  } else {
    if (roles == "Admin") {
      path = "/admin";
    } else if (roles == "Customer") {
      path = "/moderator";
    }
  }

  return dispatch => {
    dispatch(push(path))
  }
  return path;
}else{
  return dispatch => {
    dispatch()
  }
}
}

export const loginActions = {
  started: () => {
    return {
      type: LOGIN_POST_STARTED
    };
  },

  success: () => {
    return {
      type: LOGIN_POST_SUCCESS
    };
  },

  failed: response => {
    
    return {
      type: LOGIN_POST_FAILED,
      errors: response.data
    };
  },

  setCurrentUser: user => {
    ////console.log('LOGIN_SET_CURRENT_USER: ', user);
    return {
      type: LOGIN_SET_CURRENT_USER,
      user
    };
  }
};

export function logout() {
  console.log("logout1-");
  return dispatch => {
    logoutByJWT(dispatch);
  };
}

export const loginByJWT = (tokens, dispatch) => {
  const { token, refreshToken } = tokens;
  setAuthorizationToken(token);
  ///console.log('Hello app Token: ', token);
  var user = jwt.decode(token);
  ///console.log('Hello app User: ', user);
  if (!Array.isArray(user.roles)) {
    user.roles = Array.of(user.roles);
  }
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("refreshToken", refreshToken);
  
  dispatch(loginActions.setCurrentUser(user));
};

export const logoutByJWT = dispatch => {
  console.log("logout2")
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");
  setAuthorizationToken(false);
  dispatch(loginActions.setCurrentUser({}));
};
