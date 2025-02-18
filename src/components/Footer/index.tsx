import { Typography } from "@mui/material";

const Footer = () => {
	return (
		<Typography component="p" mb={1} fontSize={[12, null, 16]}>
			© 2025 ⸱ <strong>Empresa X</strong> em parceria com a{" "}
			<strong>Lobby</strong>
		</Typography>
	);
};

export default Footer;
