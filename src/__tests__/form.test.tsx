import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { vi } from "vitest";

import { RedeemProvider } from "../context/Redeem";
import { StepperProvider } from "../context/Stepper";
import { ProductProvider } from "../context/Product";
import FormTemplate from "../templates/Form";
import { fetchAddressByCep } from "../services/cep";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../services/cep", () => ({
	fetchAddressByCep: vi.fn(),
}));

const queryClient = new QueryClient();

const renderComponent = () => {
	return render(
		<QueryClientProvider client={queryClient}>
			<RedeemProvider>
				<StepperProvider>
					<ProductProvider>
						<FormTemplate />
					</ProductProvider>
				</StepperProvider>
			</RedeemProvider>
		</QueryClientProvider>
	);
};

describe("FormTemplate Component", () => {
	test("Renderiza corretamente os campos do formulário", () => {
		renderComponent();

		expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/CPF ou CNPJ/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Rua/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Bairro/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/País/i)).toBeInTheDocument();
	});

	test("Preenche e formata corretamente o CEP", async () => {
		vi.mocked(fetchAddressByCep).mockResolvedValue({
			street: "Rua Suzana Cortez Balreira",
			neighborhood: "São Gonçalo",
			city: "Pelotas",
			state: "RS",
		});

		renderComponent();

		const cepInput = screen.getByLabelText(/CEP/i);
		fireEvent.change(cepInput, { target: { value: "96.075-160" } });

		await waitFor(() =>
			expect(fetchAddressByCep).toHaveBeenCalledWith("96.075-160")
		);

		expect(
			screen.getByDisplayValue("Rua Suzana Cortez Balreira")
		).toBeInTheDocument();
	});

	test("Submete os dados corretamente", async () => {
		const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

		renderComponent();

		fireEvent.change(screen.getByLabelText(/Nome completo/i), {
			target: { value: "João da Silva" },
		});

		fireEvent.change(screen.getByLabelText(/CPF ou CNPJ/i), {
			target: { value: "123.456.789-09" },
		});

		fireEvent.change(screen.getByLabelText(/E-mail/i), {
			target: { value: "joao@email.com" },
		});

		fireEvent.change(screen.getByLabelText(/CEP/i), {
			target: { value: "96.075-160" },
		});

		fireEvent.change(screen.getByLabelText(/Rua/i), {
			target: { value: "Rua Suzana Cortez Balreira" },
		});

		fireEvent.click(screen.getByText(/Continuar/i));

		await waitFor(() => {
			expect(consoleLogSpy).not.toHaveBeenCalledWith(
				expect.stringMatching(/Error:/)
			);
		});

		consoleLogSpy.mockRestore();
	});
});
