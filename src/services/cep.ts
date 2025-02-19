export const fetchAddressByCep = async (cep: string) => {
	const cleanedCep = cep.replace(/\D/g, "");

	if (cleanedCep.length !== 8) return;

	try {
		const response = await fetch(
			`https://viacep.com.br/ws/${cleanedCep}/json/`
		);
		const data = await response.json();

		if (data.erro) return;

		return {
			street: data.logradouro,
			neighborhood: data.bairro,
			city: data.localidade,
			state: data.uf,
		};
	} catch (error) {
		console.error("Erro ao buscar endereço:", error);
		return null;
	}
};
