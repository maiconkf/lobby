import { Box as BoxMui } from "@mui/material";
import { IBoxProps } from "./box.interfaces";
import theme from "../../../theme";

const Box = ({ borderRadius, children }: IBoxProps) => {
	return (
		<BoxMui
			p={2}
			bgcolor={theme.palette.background.paper}
			borderRadius={borderRadius}
			textAlign="center"
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
		>
			{children}
		</BoxMui>
	);
};

export default Box;
