import AddProductService from "./AddProductService";
import { push } from "connected-react-router";

import update from "../../../helpers/update";

export const PRODUCT_ADD_STARTED = "PRODUCT_ADD_STARTED";
export const PRODUCT_ADD_SUCCESS = "PRODUCT_ADD_SUCCESS";
export const PRODUCT_ADD_FAILED = "PRODUCT_ADD_FAILED";

export const STORES_STARTED = "STORES_STARTED";
export const STORES_SUCCESS = "STORES_SUCCESS";
export const STORES_FAILED = "STORES_FAILED";
const initialState = {
  list: {
    response:[],
    stores: [],
    loading: true,
    success: false,
    failed: false,
  },
};

export const getStores = () => {
  return (dispatch) => {
    dispatch(getStoresListActions.started());
    AddProductService.getStores()
      .then(
        (response) => {
          dispatch(getStoresListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getStoresListActions.failed(err));
      });
  };
};
export const addProduct = (model) => {
  return (dispatch) => {
    AddProductService.addProduct(model)
      .then(
        (response) => {
          dispatch(getListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getListActions.failed(err.response.data));
      });
  };
};


export const getStoresListActions = {
  started: () => {
    return {
      type: STORES_STARTED,
    };
  },
  success: (response) => {
    return {
      type: STORES_SUCCESS,
      payload: response.data,
    };
  },

  failed: (error) => {
    return {
      type: STORES_FAILED,
      errors: error,
    };
  },
};
export const getListActions = {
    started: () => {
      return {
        type: PRODUCT_ADD_STARTED,
      };
    },
    success: (response) => {
      return {
        type: PRODUCT_ADD_SUCCESS,
        //response: response.data,
      };
    },
  
    failed: (error) => {
      return {
        type: PRODUCT_ADD_FAILED,
        errors: error,
      };
    },
  };
  
export const addProductReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case PRODUCT_ADD_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case PRODUCT_ADD_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      //newState = update.set(newState, "list.response", action.response);
      break;
    }
    case PRODUCT_ADD_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      newState = update.set(newState, "list.errors", action.errors);
      break;
    }
    case STORES_STARTED: {
        newState = update.set(state, "list.loading", true);
        newState = update.set(newState, "list.success", false);
        newState = update.set(newState, "list.failed", false);
        break;
      }
      case STORES_SUCCESS: {
        newState = update.set(state, "list.loading", false);
        newState = update.set(newState, "list.failed", false);
        //newState = update.set(newState, "list.success", true);
        newState = update.set(newState, "list.success", false);
        newState = update.set(newState, "list.stores", action.payload);
        break;
      }
      case STORES_FAILED: {
        newState = update.set(state, "list.loading", false);
        newState = update.set(newState, "list.success", false);
        //newState = update.set(newState, "list.failed", true);
        newState = update.set(newState, "list.failed", false);
        newState = update.set(newState, "list.errors", action.errors);
        break;
      }
    default: {
      return newState;
    }
  }
  return newState;
};
