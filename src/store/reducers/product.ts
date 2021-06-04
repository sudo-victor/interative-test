import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/actionTypes";

const INITIAL_STATE = {
  product: [] as Product[],
};

type Action = {
  type: string;
  payload: PayloadUpdate;
}

type PayloadUpdate = { 
  product: Product;
  id: string; 
};

type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  amount: number;
  price: number;
}


export const product = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        product: [...state.product, action.payload.product]
      };

    case DELETE_PRODUCT:
      const productsGroup = state.product.filter( product => product.id !== action.payload.product.id);
      return {
        product: productsGroup
      };

      case UPDATE_PRODUCT:
        const productsUpdated = state.product.map( product => {
          if(product.id === action.payload.id) {
            return action.payload.product;
          }
          return product;
        });
        console.log(action.payload, productsUpdated);
        return {
          product: productsUpdated
        };

    default:
      return state;
  }
};