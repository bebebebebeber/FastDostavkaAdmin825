import AddProductService from "./AddProductService";
import { push } from "connected-react-router";

import update from "../../../helpers/update";

export const PRODUCT_ADD2_STARTED = "PRODUCT_ADD2_STARTED";
export const PRODUCT_ADD2_SUCCESS = "PRODUCT_ADD2_SUCCESS";
export const PRODUCT_ADD2_FAILED = "PRODUCT_ADD2_FAILED";

export const STORES2_STARTED = "STORES2_STARTED";
export const STORES2_SUCCESS = "STORES2_SUCCESS";
export const STORES2_FAILED = "STORES2_FAILED";

export const CROPPED_STARTED = "CROPPED_STARTED";
export const CROPPED_SUCCESS = "CROPPED_SUCCESS";
export const CROPPED_FAILED = "CROPPED_FAILED";

const initialState = {
  list: {
    response: "",
    cropImg:"",
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
    //dispatch(getListActions.started());
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

export const sendCroppedImage = (model) => {
  return (dispatch) => {
    //dispatch(getCroppedListActions.started());
    AddProductService.sendCroppedImage(model)
      .then(
        (response) => {
          dispatch(getCroppedListActions.success(response));
        },
        (err) => {
          throw err;
        }
      )
      .catch((err) => {
        dispatch(getCroppedListActions.failed(err.response.data));
      });
  };
};

export const getStoresListActions = {
  started: () => {
    return {
      type: STORES2_STARTED,
    };
  },
  success: (response) => {
    return {
      type: STORES2_SUCCESS,
      payload: response.data,
    };
  },

  failed: (error) => {
    return {
      type: STORES2_FAILED,
      errors: error,
    };
  },
};
export const getListActions = {
  started: () => {
    return {
      type: PRODUCT_ADD2_STARTED,
    };
  },
  success: (response) => {
    return {
      type: PRODUCT_ADD2_SUCCESS,
      //response: response.data,
    };
  },
  failed: (error) => {
    return {
      type: PRODUCT_ADD2_FAILED,
      errors: error,
    };
  },
};
export const getCroppedListActions = {
  started: () => {
    return {
      type: CROPPED_STARTED,
    };
  },
  success: (response) => {
    return {
      type: CROPPED_SUCCESS,
      cropImg: response.data,
    };
  },
  failed: (error) => {
    return {
      type: CROPPED_FAILED,
      errors: error,
    };
  },
};
export const addProductReducer = (state = initialState, action) => {
  let newState = state;

  switch (action.type) {
    case PRODUCT_ADD2_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case PRODUCT_ADD2_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.success", true);
      //newState = update.set(newState, "list.response", action.response);
      break;
    }
    case PRODUCT_ADD2_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", true);
      newState = update.set(newState, "list.errors", action.errors);
      break;
    }
    case STORES2_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case STORES2_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      //newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.stores", action.payload);
      break;
    }
    case STORES2_FAILED: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.success", false);
      //newState = update.set(newState, "list.failed", true);
      newState = update.set(newState, "list.failed", false);
      newState = update.set(newState, "list.errors", action.errors);
      break;
    }
    case CROPPED_STARTED: {
      newState = update.set(state, "list.loading", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.failed", false);
      break;
    }
    case CROPPED_SUCCESS: {
      newState = update.set(state, "list.loading", false);
      newState = update.set(newState, "list.failed", false);
      //newState = update.set(newState, "list.success", true);
      newState = update.set(newState, "list.success", false);
      newState = update.set(newState, "list.cropImg", action.cropImg);
      break;
    }
    case CROPPED_FAILED: {
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
