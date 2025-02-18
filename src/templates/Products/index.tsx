import Container from "../../components/Container";
import Box from "../../components/Box";
import Footer from "../../components/Footer";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../../services/products";
import { CircularProgress, Box as BoxMui } from "@mui/material";
import { IProduct } from "./products.interfaces";
import Product from "../../components/Product";
import { IOneProduct } from "../../components/Product/product.interfaces";

const Products = () => {
	const {
		data: products,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts("5c7e9bc8-e063-4d86-8e2c-eccce6f3ee1c"),
	});

	const productQueries = useQueries({
		queries: products?.items
			? products.items.map((product: IProduct) => ({
					queryKey: ["product", product.customer_product_id],
					queryFn: () => getProduct(product.customer_product_id),
			  }))
			: [],
	});

	return (
		<Container>
			<Box borderRadius={5}>
				{(() => {
					if (isLoading) {
						return <CircularProgress />;
					}

					if (isError) {
						return (
							<div>
								Erro ao carregar produtos:{" "}
								{error instanceof Error ? error.message : "Erro desconhecido"}
							</div>
						);
					}

					return (
						<BoxMui
							display="flex"
							justifyContent="space-between"
							flexWrap="wrap"
							gap={1}
							px={2}
						>
							{productQueries.map((query, index) => {
								const { data, isLoading, isError, error } = query;
								const product = data as IOneProduct | undefined;

								return (
									<Product
										key={index}
										product={product}
										isLoading={isLoading}
										isError={isError}
										error={error}
									/>
								);
							})}
						</BoxMui>
					);
				})()}
				<Footer />
			</Box>
		</Container>
	);
};

export default Products;
