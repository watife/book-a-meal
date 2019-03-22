import Api from "../Api/Api";

export const error = error => ({
  type: "Error",
  payload: error
});

export const actionCreate = (url, data, type) => {
  return async dispatch => {
    try {
      const response = await Api.create(url, data);
      dispatch({
        type: type,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const actionGet = (url, type) => {
  return async dispatch => {
    try {
      const response = await Api.get(url);
      dispatch({
        type: type,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const actionUpdate = (url, type) => {
  return async dispatch => {
    try {
      const response = await Api.update(url, data);
      dispatch({
        type: type,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const actionDelete = (url, type) => {
  return async dispatch => {
    try {
      const response = await Api.delete(url, data);
      dispatch({
        type: type,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const actionAuth = (url, type) => {
  return async dispatch => {
    try {
      const response = await Api.auth(url, data);
      dispatch({
        type: type,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const actionFake = type => {
  return async dispatch => {
    try {
      const response = await Api.fake(`posts/1`);
      console.log(response);
      return dispatch({
        type: type,
        payload: response
      });
    } catch (error) {
      console.log(error);
    }
  };
};
