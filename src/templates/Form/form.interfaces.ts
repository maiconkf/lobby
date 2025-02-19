export interface IFormData {
	full_name: string;
	cpf_cnpj: string;
	email: string;
	cep: string;
	street: string;
	number: number;
	complement?: string | null;
	neighborhood: string;
	city: string;
	state: string;
	country: string;
	sizes?: string;
	extra_questions: Record<string, string | number | undefined>;
}
