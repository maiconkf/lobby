import Container from "../../components/Container";
import Box from "../../components/Box";
import Footer from "../../components/Footer";
import {
	CircularProgress,
	Box as BoxMui,
	Typography,
	Button,
} from "@mui/material";
import Product from "../../components/Product";
import { useRedeem } from "../../context/Redeem/useRedeem";
import { IProduct } from "./products.interfaces";
import { useProduct } from "../../context/Product/useProduct";
import { useStepper } from "../../context/Stepper/useStepper";

const Products = () => {
	const { previousStep, nextStep } = useStepper();
	const { redeem, isLoading, isError, error } = useRedeem();
	const { selectedProducts } = useProduct();

	return (
		<Container>
			<Box borderRadius={5} px={4}>
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
						<>
							<Typography component="p" my={2} fontWeight={600} fontSize={20}>
								Escolha o seu presente! 🎁
							</Typography>

							<BoxMui
								display="flex"
								justifyContent="space-between"
								flexWrap="wrap"
								gap={1.5}
								pt={2}
								pb={4}
							>
								{redeem?.items.map((item, index) => {
									const product = item as IProduct;

									return <Product key={index} product={product} />;
								})}
							</BoxMui>
						</>
					);
				})()}
				<BoxMui
					display="flex"
					justifyContent="space-between"
					width="100%"
					mb={4}
				>
					<Button variant="outlined" onClick={previousStep}>
						Voltar
					</Button>
					<Button
						variant="contained"
						onClick={nextStep}
						disabled={selectedProducts.length === 0}
					>
						Continuar
					</Button>
				</BoxMui>
				{redeem?.title && <Footer company={redeem.title} />}
			</Box>
		</Container>
	);
};

export default Products;
