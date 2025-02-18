import { IProduct } from "../../templates/Products/products.interfaces";

export interface IRedeem {
	logo_url: string;
	welcome_title: string;
	welcome_phrase: string;
	title: string;
	background_color: string;
	button_color: string;
	status: string;
	items: IProduct[];
}

export interface IRedeemContext {
	redeem: IRedeem | null;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}
