import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import { ProductProvider } from "../context/Product"; // Certifique-se de importar o ProductProvider
import { StepperProvider } from "../context/Stepper"; // Certifique-se de importar o StepperProvider
import { useRedeem } from "../context/Redeem/useRedeem";
import Products from "../templates/Products";
import { IProduct } from "../templates/Products/products.interfaces";

vi.mock("../context/Redeem/useRedeem", () => ({
	useRedeem: vi.fn(),
}));

vi.mock("../context/Product/useProduct", () => ({
	useProduct: vi.fn().mockReturnValue({
		toggleProduct: vi.fn(),
		selectedProducts: [],
	}),
}));

export const mockProducts: IProduct[] = [
	{
		customer_product_id: "1",
		name: "Produto 1",
		image_url: "/produto1.jpg",
		quantity: 10,
		optional: false,
		sizes_grid: {
			name: "Camiseta",
		},
		sizes: [],
	},
	{
		customer_product_id: "2",
		name: "Produto 2",
		image_url: "/produto2.jpg",
		quantity: 5,
		optional: true,
		sizes_grid: null,
		sizes: [],
	},
];

const renderWithProviders = (ui: React.ReactNode) => {
	const queryClient = new QueryClient();

	return render(
		<QueryClientProvider client={queryClient}>
			<StepperProvider>
				<ProductProvider>{ui}</ProductProvider>
			</StepperProvider>
		</QueryClientProvider>
	);
};

describe("Products Component", () => {
	test("Renderiza loading corretamente", () => {
		vi.mocked(useRedeem).mockReturnValue({
			isLoading: true,
			isError: false,
			error: null,
			redeem: null,
		});

		renderWithProviders(<Products />);

		expect(screen.getByRole("progressbar")).toBeInTheDocument();
	});

	test("Renderiza erro corretamente", () => {
		vi.mocked(useRedeem).mockReturnValue({
			isLoading: false,
			isError: true,
			error: new Error("Erro ao carregar produtos"),
			redeem: null,
		});

		renderWithProviders(<Products />);

		expect(
			screen.getByText("Erro ao carregar produtos: Erro ao carregar produtos")
		).toBeInTheDocument();
	});

	test("Renderiza os produtos corretamente", async () => {
		vi.mocked(useRedeem).mockReturnValue({
			isLoading: false,
			isError: false,
			error: null,
			redeem: {
				items: mockProducts,
				title: "Empresa Teste",
				logo_url: "",
				welcome_title: "",
				welcome_phrase: "",
				background_color: "",
				button_color: "",
				status: "",
				extra_questions: [],
			},
		});

		renderWithProviders(<Products />);

		await waitFor(() => {
			expect(
				screen.getByText("Escolha o seu presente! 🎁")
			).toBeInTheDocument();
			expect(screen.getByText("Produto 1")).toBeInTheDocument();
			expect(screen.getByText("Produto 2")).toBeInTheDocument();
		});
	});
});
