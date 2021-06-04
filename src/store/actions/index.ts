import { ADD_PRODUCT } from "./actionTypes";

type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  amount: number;
  price: number;
}

type PayloadUpdate = { 
  id: string; 
  product: Product;
};

export const product = (value: Product | PayloadUpdate) => ({
  type: ADD_PRODUCT,
  payload: value
});