import { Box } from "@mui/material";
import { ILogo } from "./logo.interfaces";

const Logo = ({ src }: ILogo) => {
	return (
		<Box sx={{ img: { height: "auto" } }}>
			<img src={src} width={189} height={54} alt="Logotipo da Lobby" />
		</Box>
	);
};

export default Logo;
