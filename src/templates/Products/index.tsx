import Container from "../../components/Container";
import Box from "../../components/Box";
import Footer from "../../components/Footer";
import { useQueries } from "@tanstack/react-query";
import { getProduct } from "../../services/products";
import { CircularProgress, Box as BoxMui } from "@mui/material";
import { IProduct } from "./products.interfaces";
import Product from "../../components/Product";
import { IOneProduct } from "../../components/Product/product.interfaces";
import { useRedeem } from "../../context/Redeem/useRedeem";

const Products = () => {
	const { redeem, isLoading, isError, error } = useRedeem();

	const productQueries = useQueries({
		queries: redeem?.items
			? redeem.items.map((product: IProduct) => ({
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
				{redeem?.title && <Footer company={redeem.title} />}
			</Box>
		</Container>
	);
};

export default Products;
