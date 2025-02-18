import { Box, Typography } from "@mui/material";
import { IProductProps } from "./product.interfaces";

const Product = ({ product }: IProductProps) => {
	if (product.total_inventory === 0) return;

	return (
		<Box
			border="0.5px solid #D8DCE2"
			width={["100%", "calc(50% - 4px)", "calc(33.33% - 8px)"]}
			minHeight={290}
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			flexDirection="column"
			p={1.75}
			borderRadius={1.5}
			sx={{
				cursor: "pointer",
				boxSizing: "border-box",
				img: {
					objectFit: "contain",
					display: "block",
					width: "100%",
					maxWidth: 261,
				},
			}}
		>
			<img src={product?.image_url} width={261} height={261} />
			<Typography component="p">{product?.full_name}</Typography>
		</Box>
	);
};

export default Product;
