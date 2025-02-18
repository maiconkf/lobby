import { Box as BoxMui, Button, Typography } from "@mui/material";
import Container from "../../components/Container";
import Box from "../../components/Box";
import Logo from "../../components/Logo";
import { useStepper } from "../../context/Stepper/useStepper";
import Footer from "../../components/Footer";

const Welcome = () => {
	const { nextStep } = useStepper();

	return (
		<Container>
			<Box borderRadius={5}>
				<BoxMui pt={[4, null, 15]} px={[4, null, 15]} pb={[10, null, 15]}>
					<Logo />
					<Typography variant="h1" mt={[7, null, 4]} mb={2}>
						Bem vindo!
					</Typography>
					<Typography variant="h2" mb={[8, null, 4]}>
						Estamos muito felizes em ter você em nossa equipe!
						<BoxMui component="span" mt={1} display="block">
							Preencha as perguntinhas a seguir para escolher o seu presente! 🎁
						</BoxMui>
					</Typography>
					<Button variant="contained" onClick={nextStep}>
						Começar!
					</Button>
				</BoxMui>
				<Footer />
			</Box>
		</Container>
	);
};

export default Welcome;
