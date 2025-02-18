import Container from "../../components/Container";
import Box from "../../components/Box";
import Footer from "../../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/products";
import { CircularProgress, Box as BoxMui } from "@mui/material";
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
		queryFn: () => getProducts(),
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
							{products.map((product: IOneProduct) => {
								return <Product key={product.id} product={product} />;
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
