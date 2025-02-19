import { IProduct } from "../../templates/Products/products.interfaces";

export interface IRedeem {
	id?: string | undefined;
	logo_url: string;
	welcome_title: string;
	welcome_phrase: string;
	title: string;
	background_color: string;
	button_color: string;
	status: string;
	items: IProduct[];
	extra_questions: IExtraQuestions[];
}

export interface IRedeemContext {
	redeem: IRedeem | null;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}

export interface IExtraQuestions {
	id: number;
	answer_type: string;
	options: string[];
	position: number;
	question: string;
}
