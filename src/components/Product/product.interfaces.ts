export interface IProductProps {
	product?: IOneProduct;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}

export interface IOneProduct {
	id: string;
	full_name: string;
	image_url: string;
	total_inventory: number;
}
