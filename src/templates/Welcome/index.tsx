import { Box as BoxMui, Button, Typography } from "@mui/material";
import Container from "../../components/Container";
import Box from "../../components/Box";
import Logo from "../../components/Logo";

const Welcome = () => {
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
					<Button variant="contained">Começar!</Button>
				</BoxMui>
				<Typography component="p" mb={1} fontSize={[12, null, 16]}>
					© 2025 ⸱ <strong>Empresa X</strong> em parceria com a{" "}
					<strong>Lobby</strong>
				</Typography>
			</Box>
		</Container>
	);
};

export default Welcome;
