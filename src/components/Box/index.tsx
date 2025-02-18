import { Box as BoxMui } from "@mui/material";
import { IBoxProps } from "./box.interfaces";
import { useRedeem } from "../../context/Redeem/useRedeem";
import createDynamicTheme from "../../../theme";

const Box = ({ borderRadius, children }: IBoxProps) => {
	const { redeem } = useRedeem();
	const theme = createDynamicTheme(redeem);

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
