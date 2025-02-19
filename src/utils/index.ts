export const brazilianStatesUFs = [
	"AC",
	"AL",
	"AP",
	"AM",
	"BA",
	"CE",
	"DF",
	"ES",
	"GO",
	"MA",
	"MT",
	"MS",
	"MG",
	"PA",
	"PB",
	"PR",
	"PE",
	"PI",
	"RJ",
	"RN",
	"RS",
	"RO",
	"RR",
	"SC",
	"SP",
	"SE",
	"TO",
];

export const formatCep = (value: string) => {
	const numericValue = value.replace(/\D/g, "");

	if (numericValue.length <= 2) return numericValue;
	if (numericValue.length <= 5)
		return `${numericValue.slice(0, 2)}.${numericValue.slice(2)}`;
	return `${numericValue.slice(0, 2)}.${numericValue.slice(
		2,
		5
	)}-${numericValue.slice(5, 8)}`;
};

export const formatCPF_CNPJ = (value: string) => {
	let cleanValue = value.replace(/\D/g, "");

	if (cleanValue.length > 14) {
		cleanValue = cleanValue.slice(0, 14);
	}

	if (cleanValue.length <= 11) {
		return cleanValue
			.replace(/^(\d{3})(\d)/, "$1.$2")
			.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
			.replace(/\.(\d{3})(\d)/, ".$1-$2");
	} else {
		return cleanValue
			.replace(/^(\d{2})(\d)/, "$1.$2")
			.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
			.replace(/\.(\d{3})(\d)/, ".$1/$2")
			.replace(/(\d{4})(\d)/, "$1-$2");
	}
};

export const validateCpfCnpj = (value: string): boolean => {
	const cleanedValue = value.replace(/\D/g, "");

	if (cleanedValue.length === 11) {
		return validateCpf(cleanedValue);
	}

	if (cleanedValue.length === 14) {
		return validateCnpj(cleanedValue);
	}

	return false;
};

const validateCpf = (cpf: string): boolean => {
	let sum = 0;
	let remainder;

	if (/^(\d)\1+$/.test(cpf)) return false;

	for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(cpf[9])) return false;

	sum = 0;
	for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(cpf[10])) return false;

	return true;
};

const validateCnpj = (cnpj: string): boolean => {
	if (/^(\d)\1+$/.test(cnpj)) return false;

	const weightsFirst = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const weightsSecond = [6, ...weightsFirst];

	const calcDigit = (cnpj: string, weights: number[]) =>
		(11 -
			(cnpj
				.split("")
				.slice(0, weights.length)
				.reduce((sum, num, index) => sum + parseInt(num) * weights[index], 0) %
				11)) %
		10;

	return (
		calcDigit(cnpj, weightsFirst) === parseInt(cnpj[12]) &&
		calcDigit(cnpj, weightsSecond) === parseInt(cnpj[13])
	);
};
