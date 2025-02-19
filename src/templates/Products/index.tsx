import Container from "../../components/Container";
import Box from "../../components/Box";
import Footer from "../../components/Footer";
import { CircularProgress, Box as BoxMui, Typography } from "@mui/material";
import Product from "../../components/Product";
import { useRedeem } from "../../context/Redeem/useRedeem";
import { IProduct } from "./products.interfaces";
import BoxFooter from "../../components/Footer/Box";
import { useStepper } from "../../context/Stepper/useStepper";

const Products = () => {
	const { redeem, isLoading, isError, error } = useRedeem();
	const { nextStep } = useStepper();

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
				<BoxFooter onClick={nextStep} />
				{redeem?.title && <Footer company={redeem.title} />}
			</Box>
		</Container>
	);
};

export default Products;
