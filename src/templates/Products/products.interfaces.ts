export interface IProduct {
	customer_product_id: string;
	name: string;
	quantity: number;
	optional: boolean;
	image_url: string;
	sizes_grid: {
		name: string;
	} | null;
	sizes: Array<{
		id: string;
		name: string;
	}>;
}
