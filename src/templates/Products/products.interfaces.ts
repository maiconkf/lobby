export interface IProduct {
	customer_product_id: string;
	quantity: number;
	optional: boolean;
	image_url: string;
	sizes_grid: {
		name: string;
	};
	sizes: Array<{
		id: string;
		name: string;
	}>;
}
