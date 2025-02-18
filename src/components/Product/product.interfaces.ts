export interface IProductProps {
	product: IOneProduct;
}

export interface IOneProduct {
	id: string;
	full_name: string;
	image_url: string;
	total_inventory: number;
}
