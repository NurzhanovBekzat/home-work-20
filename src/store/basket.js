import { fetchRequest } from "../lib/fetchAPI";

const initialState = {
  basketData: [],
  totalAmount: 0,
  amount: 0,
};

export const basketActionTypes = {
  GET_BASKET: "GETBASKET",
  INCREMENT_BASKET_ITEM: "INCREMENTBASKETITEM",
  DECREMENT_BASKET_ITEM: "DECREMENTBASKETITEM",
  DEELETE_BASKET_ITEM: "DELETEBASKETITEM",
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketActionTypes.GET_BASKET:
      return {
        ...state,
        basketData: action.payload,
      };

    case basketActionTypes.INCREMENT_BASKET_ITEM:
      return {
        ...state,
        basketData: action.payload,
      };
    case basketActionTypes.DECREMENT_BASKET_ITEM:
      return {
        ...state,
        basketData: action.payload,
      };
    default:
      return state;
  }
};

export function getBasket() {
  return async (dispatch) => {
    try {
      const responce = await fetchRequest("/basket");
      dispatch({ type: basketActionTypes.GET_BASKET, payload: responce.items });
    } catch (err) {}
  };
}

export function incrementAmount(id, amount) {
  return async (dispatch) => {
    const responce = await fetchRequest(`/basketItem/${id}/update`, {
      method: "PUT",
      body: { amount: amount + 1 },
    });
    dispatch({
      type: basketActionTypes.INCREMENT_BASKET_ITEM,
      payload: responce.items,
    });
  };
}

export function decrementAmount(id, amount) {
  return async (dispatch) => {
    if (amount !== 0) {
      const responce = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount },
      });

      dispatch(getBasket());
      return responce.items;
    } else {
      const responce = await fetchRequest(`/basketItem/${id}/delete`, {
        method: "DELETE",
      });

      dispatch(getBasket());
      return responce.items;
    }
  };
}
