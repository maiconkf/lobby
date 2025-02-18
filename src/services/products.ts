import api from "./api";

export const getProducts = async (id: string) => {
	const response = await api.get(`/v1/redeem_pages/${id}`);

	return response.data;
};

export const getProduct = async (id: string) => {
	const response = await api.get(`/v1/customer_products/${id}`);

	return response.data;
};
