export interface IProductProps {
	product?: IOneProduct;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}

export interface IOneProduct {
	full_name: string;
	image_url: string;
}
