import StoresService from "./StoresService";
import { push } from "connected-react-router";

import update from "../../../helpers/update";

export const STORES_STARTED = "STORES_STARTED";
export const STORES_SUCCESS = "STORES_SUCCESS";
export const STORES_FAILED = "STORES_FAILED";

const initialState = {
  list: {
    data: [],
    loading: true,
    success: false,
    failed: false,
  },
};

export const getInfo = () => {
  return (dispatch) => {
    dispatch(getListActions.started());
    StoresService.getInfo()
      .then(
        (response) => {
          dispatch(getListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getListActions.failed(err));
      });
  };
};
export const changeStatus = (model) => {
  return (dispatch) => {
    StoresService.changeStatus(model)
      .then(
        (response) => {
          dispatch(getInfo(1));
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
export const deleteStore = (id) => {
  return (dispatch) => {
    StoresService.deleteStore(id)
      .then(
        (response) => {
          dispatch(getInfo());
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
export const createStore = (model) => {
  return (dispatch) => {
    StoresService.createStore(model)
      .then(
        (response) => {
          dispatch(getInfo());
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

export const getListActions = {
  started: () => {
    return {
      type: STORES_STARTED,
    };
  },
  success: (response) => {
    return {
      type: STORES_SUCCESS,
      response: response.data,
    };
  },

  failed: (error) => {
    return {
      type: STORES_FAILED,
      errors: error,
    };
  },
};

export const storesReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case STORES_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case STORES_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.response);

      break;
    }
    case STORES_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      newState = update.set(newState, "list.errors", action.errors);
      break;
    }
    default: {
      return newState;
    }
  }
  return newState;
};
