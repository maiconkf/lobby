import { renderHook, act } from "@testing-library/react";
import { ProductProvider } from "../context/Product";
import { useProduct } from "../context/Product/useProduct";
import { mockProducts } from "./products.test";

describe("ProductProvider", () => {
	test("Adiciona e remove produtos corretamente", () => {
		const wrapper = ({ children }: { children: React.ReactNode }) => (
			<ProductProvider>{children}</ProductProvider>
		);

		const { result } = renderHook(() => useProduct(), { wrapper });

		act(() => {
			result.current.toggleProduct(mockProducts[0]);
		});

		expect(result.current.selectedProducts).toHaveLength(1);

		act(() => {
			result.current.toggleProduct(mockProducts[0]);
		});

		expect(result.current.selectedProducts).toHaveLength(0);
	});
});
