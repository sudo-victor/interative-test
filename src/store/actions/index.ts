import { ADD_PRODUCT } from "./actionTypes";

type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  amount: number;
  price: number;
}

export const product = (value: Product) => ({
  type: ADD_PRODUCT,
  payload: value
});