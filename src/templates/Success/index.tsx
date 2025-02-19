import { Box as BoxMui, Typography } from "@mui/material";
import Container from "../../components/Container";
import Box from "../../components/Box";
import Logo from "../../components/Logo";
import Footer from "../../components/Footer";
import { useRedeem } from "../../context/Redeem/useRedeem";
import createDynamicTheme from "../../../theme";

const Success = () => {
	const { redeem } = useRedeem();
	const theme = createDynamicTheme(redeem);

	return (
		<Container>
			<Box borderRadius={5}>
				<BoxMui pt={[4, null, 15]} px={[null, null, 4]} pb={[10, null, 15]}>
					{redeem && (
						<>
							<Logo src={redeem.logo_url} />
							<Typography variant="h1" mt={[7, null, 4]} mb={2}>
								Presente resgatado! 🎉🥳
							</Typography>
							<Typography
								component="p"
								mb={1}
								fontSize={20}
								color={theme.palette.grey[400]}
							>
								Seu pedido está em andamento!
							</Typography>
							<Typography
								component="p"
								mb={[1, null, 4]}
								fontSize={20}
								color={theme.palette.grey[400]}
							>
								E não se preocupe, as alterações de status do envio chegam todas
								em seu e-mail!
							</Typography>
						</>
					)}
				</BoxMui>
				{redeem && <Footer company={redeem.title} />}
			</Box>
		</Container>
	);
};

export default Success;
