import api from "./api";

export const getRedeem = async (id: string) => {
	const response = await api.get(`/v1/redeem_pages/${id}`);
	return response.data;
};
