import { GlobalStyles } from "@mui/material";
import { useRedeem } from "../context/Redeem/useRedeem";

const DynamicGlobalStyles = () => {
	const { redeem } = useRedeem();

	return (
		<GlobalStyles
			styles={{
				body: {
					margin: 0,
					padding: 0,
					backgroundColor: redeem?.background_color || "#EFF6FF",
				},
			}}
		/>
	);
};

export default DynamicGlobalStyles;
