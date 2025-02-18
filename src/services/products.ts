import api from "./api";

export const getProducts = async () => {
	const response = await api.get("/v1/customer_products");

	return response.data;
};
