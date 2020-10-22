import ProductsService from "./ProductsService";
import update from "../../../helpers/update";

export const PRODUCTS_STARTED = "PRODUCTS_STARTED";
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCTS_FAILED = "PRODUCTS_FAILED";

const initialState = {
  list: {
    data: [],
    loading: true,
    success: false,
    failed: false,
  },
};

export const getProducts = (page) => {
  return (dispatch) => {
    dispatch(getListActions.started());
    ProductsService.getProducts(page)
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

export const deleteProduct = (id) => {
  return (dispatch) => {
    ProductsService.deleteProduct(id)
      .then(
        (response) => {
          dispatch(getProducts(1));
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
      type: PRODUCTS_STARTED,
    };
  },
  success: (response) => {
    return {
      type: PRODUCTS_SUCCESS,
      response: response.data,
    };
  },

  failed: (error) => {
    return {
      type: PRODUCTS_FAILED,
      errors: error,
    };
  },
};

export const productsReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case PRODUCTS_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case PRODUCTS_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.data", action.response);

      break;
    }
    case PRODUCTS_FAILED: {
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
