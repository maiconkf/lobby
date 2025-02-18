import { Box } from "@mui/material";
import { useRedeem } from "../../context/Redeem/useRedeem";
import createDynamicTheme from "../../../theme";
import { ICheckProduct } from "./checkproduct.interfaces";
import CheckIcon from "@mui/icons-material/Check";

const CheckProduct = ({ checked }: ICheckProduct) => {
	const { redeem } = useRedeem();
	const theme = createDynamicTheme(redeem);

	const styles = checked
		? {
				bgcolor: theme.palette.success.main,
				border: "1px solid transparent",
		  }
		: {
				bgcolor: theme.palette.background.paper,
				border: "1px solid #B1B9C5",
		  };

	return (
		<Box
			{...styles}
			borderRadius={40}
			height={40}
			width={40}
			position="absolute"
			top={14}
			right={14}
			display="flex"
			alignItems="center"
			justifyContent="center"
		>
			{checked && (
				<CheckIcon
					sx={{ color: theme.palette.background.paper, fontSize: 28 }}
				/>
			)}
		</Box>
	);
};

export default CheckProduct;
