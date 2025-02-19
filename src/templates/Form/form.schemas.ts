import * as yup from "yup";
import { validateCpfCnpj } from "../../utils";
import { IRedeem } from "../../context/Redeem/redeem.interfaces";
import { IProduct } from "../Products/products.interfaces";

export const formSchema = (redeem: IRedeem, selectedProducts: IProduct[]) =>
	yup.object().shape({
		full_name: yup.string().required("Campo obrigatório"),
		cpf_cnpj: yup
			.string()
			.required("Campo obrigatório")
			.test("valid-cpf-cnpj", "CPF/CNPJ inválido", (value) =>
				validateCpfCnpj(value ?? "")
			),
		email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
		cep: yup
			.string()
			.matches(/^\d{2}\.\d{3}-\d{3}$/, "CEP inválido")
			.required("Campo obrigatório"),
		street: yup.string().required("Campo obrigatório"),
		number: yup
			.number()
			.typeError("Por favor, insira um número válido.")
			.required("Campo obrigatório")
			.positive("O valor deve ser positivo."),
		complement: yup.string().notRequired(),
		neighborhood: yup.string().required("Campo obrigatório"),
		city: yup.string().required("Campo obrigatório"),
		state: yup.string().required("Campo obrigatório"),
		country: yup.string().required("Campo obrigatório"),
		sizes: yup.string().when([], {
			is: () => selectedProducts.some((product) => product.sizes.length > 0),
			then: (schema) => schema.required("Campo obrigatório"),
			otherwise: (schema) => schema.notRequired(),
		}),
		extra_questions: yup.lazy(() => {
			if (redeem.extra_questions.length === 0) {
				return yup.object().default({});
			}

			return yup
				.object()
				.shape(
					redeem.extra_questions.reduce((acc, question) => {
						acc[String(question.id)] = yup
							.mixed<string | number>()
							.defined()
							.notRequired();
						return acc;
					}, {} as Record<string, yup.Schema>)
				)
				.default({});
		}),
	});
