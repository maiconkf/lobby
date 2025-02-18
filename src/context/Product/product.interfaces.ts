import { IProduct } from "../../templates/Products/products.interfaces";

export interface IProductContext {
	selectedProducts: IProduct[];
	toggleProduct: (product: IProduct) => void;
}
