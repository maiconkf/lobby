import {
	Box as BoxMui,
	Button,
	CircularProgress,
	Typography,
} from "@mui/material";
import Container from "../../components/Container";
import Box from "../../components/Box";
import Logo from "../../components/Logo";
import { useStepper } from "../../context/Stepper/useStepper";
import Footer from "../../components/Footer";
import { useRedeem } from "../../context/Redeem/useRedeem";

const Welcome = () => {
	const { nextStep } = useStepper();
	const { redeem, isLoading, isError, error } = useRedeem();

	return (
		<Container>
			<Box borderRadius={5}>
				<BoxMui pt={[4, null, 15]} px={[4, null, 15]} pb={[10, null, 15]}>
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

						if (redeem) {
							return (
								<>
									<Logo src={redeem.logo_url} />
									<Typography variant="h1" mt={[7, null, 4]} mb={2}>
										{redeem.welcome_title}
									</Typography>
									<Typography variant="h2" mb={[8, null, 4]}>
										{redeem.welcome_phrase}
										<BoxMui component="span" mt={1} display="block">
											Preencha as perguntinhas a seguir para escolher o seu
											presente! 🎁
										</BoxMui>
									</Typography>
									<Button variant="contained" onClick={nextStep}>
										Começar!
									</Button>
								</>
							);
						}
					})()}
				</BoxMui>
				{redeem && <Footer company={redeem.title} />}
			</Box>
		</Container>
	);
};

export default Welcome;
