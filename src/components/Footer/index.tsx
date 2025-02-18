import { Typography } from "@mui/material";
import { IFooter } from "./footer.interfaces";

const Footer = ({ company }: IFooter) => {
	return (
		<Typography component="p" mb={1} fontSize={[12, null, 16]}>
			© 2025 ⸱ <strong>{company}</strong> em parceria com a{" "}
			<strong>Lobby</strong>
		</Typography>
	);
};

export default Footer;
