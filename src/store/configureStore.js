import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createHashHistory';

///reducers
import {loginReducer} from '../Views/defaultViews/LoginPage/reducer.js';
import {ordersReducer} from '../Views/moderatorViews/Home/reducer';
import {addProductReducer} from '../Views/productViews/AddProduct/reducer.js';
import {storesReducer} from '../Views/moderatorViews/Stores/reducer';
import {productsReducer} from '../Views/productViews/Products/reducer.js';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  const reducers = {
    login: loginReducer,
    orders:ordersReducer,
    stores:storesReducer,
    addProduct:addProductReducer,
    products:productsReducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }



  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
