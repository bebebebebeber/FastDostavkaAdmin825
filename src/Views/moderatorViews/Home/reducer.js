import OrdersService from "./OrdersService";
import { push } from "connected-react-router";

import update from "../../../helpers/update";

export const ORDERS_STARTED = "ORDERS_STARTED";
export const ORDERS_SUCCESS = "ORDERS_SUCCESS";
export const ORDERS_FAILED = "ORDERS_FAILED";

const initialState = {
  list: {
    data: [],
    loading: true,
    success: false,
    failed: false,
  },
};

export const getInfo = (page) => {
  return (dispatch) => {
    dispatch(getListActions.started());
    OrdersService.getInfo(page)
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
export const changeStatus = (model) => {
  return (dispatch) => {
    OrdersService.changeStatus(model)
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
export const deleteOrder = (id) => {
  return (dispatch) => {
    OrdersService.delete(id)
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

export const getListActions = {
  started: () => {
    return {
      type: ORDERS_STARTED,
    };
  },
  success: (response) => {
    return {
      type: ORDERS_SUCCESS,
      response: response.data,
    };
  },

  failed: (error) => {
    return {
      type: ORDERS_FAILED,
      errors: error,
    };
  },
};

export const ordersReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case ORDERS_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case ORDERS_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.response);

      break;
    }
    case ORDERS_FAILED: {
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
