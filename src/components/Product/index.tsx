import { Box, Typography } from "@mui/material";
import { IProductProps } from "./product.interfaces";
import CheckProduct from "../CheckProduct";
import { useProduct } from "../../context/Product/useProduct";
import { IProduct } from "../../templates/Products/products.interfaces";
import { useRedeem } from "../../context/Redeem/useRedeem";
import createDynamicTheme from "../../../theme";

const Product = ({ product }: IProductProps) => {
	const { redeem } = useRedeem();
	const theme = createDynamicTheme(redeem);

	const { toggleProduct, selectedProducts } = useProduct();
	const isChecked = selectedProducts.some(
		(p) => p.customer_product_id === (product as IProduct).customer_product_id
	);

	const handleSelect = () => {
		toggleProduct(product as IProduct);
	};

	if (product?.quantity === 0) return;

	return (
		<Box
			border={`0.5px solid ${
				isChecked ? theme.palette.primary.main : "#D8DCE2"
			}`}
			width={["100%", "calc(50% - 8px)", "calc(33.33% - 8px)"]}
			minHeight={290}
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			flexDirection="column"
			p={1.75}
			borderRadius={1.5}
			position="relative"
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
			onClick={handleSelect}
		>
			<CheckProduct checked={isChecked} />
			<img src={product?.image_url} width={261} height={261} />
			<Typography component="p" mt={2} fontWeight={600}>
				{product?.name}
			</Typography>
		</Box>
	);
};

export default Product;
