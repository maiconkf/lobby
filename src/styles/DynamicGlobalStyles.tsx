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
					backgroundColor:
						redeem && redeem.status === "ACTIVE"
							? redeem.background_color
							: "#FFF",
				},
			}}
		/>
	);
};

export default DynamicGlobalStyles;
