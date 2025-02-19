import { Box, Button, Typography } from "@mui/material";
import Container from "../../components/Container";
import Logo from "../../components/Logo";
import { useRedeem } from "../../context/Redeem/useRedeem";
import createDynamicTheme from "../../../theme";

const InactivePage = () => {
	const { redeem } = useRedeem();
	const theme = createDynamicTheme(redeem);

	return (
		<Container>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				height="100vh"
			>
				{redeem && (
					<>
						<Logo src={redeem.logo_url} />
						<Box
							mt={[4, null, 6]}
							mb={[null, 2]}
							sx={{ img: { maxWidth: "100%" } }}
						>
							<img
								src="/404.svg"
								alt="Página não encontrada"
								width={500}
								height={200}
							/>
						</Box>
						<Typography
							component="p"
							color="primary"
							fontSize={20}
							fontWeight={700}
							mb={2}
						>
							Oops! Página não encontrada.
						</Typography>
						<Typography
							component="p"
							color={theme.palette.grey[400]}
							textAlign="center"
							mb={6}
						>
							Parece que você explorou demais, e acabou se perdendo.
						</Typography>
						<Button variant="contained" href="https://lobby.tech/">
							Voltar para página inicial
						</Button>
					</>
				)}
			</Box>
		</Container>
	);
};

export default InactivePage;
