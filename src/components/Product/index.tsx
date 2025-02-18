import { Box, CircularProgress, Typography } from "@mui/material";
import { IProductProps } from "./product.interfaces";

const Product = ({ product, isLoading, isError, error }: IProductProps) => {
	return (
		<Box
			border="0.5px solid #D8DCE2"
			width={["100%", "calc(50% - 4px)", "calc(33.33% - 8px)"]}
			minHeight={290}
			display="flex"
			alignItems="center"
			justifyContent={isLoading ? "center" : "space-between"}
			flexDirection="column"
			p={1.75}
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
			{isLoading ? (
				<CircularProgress />
			) : isError ? (
				<p>Erro: {error instanceof Error ? error.message : "Desconhecido"}</p>
			) : (
				<>
					<img src={product?.image_url} width={261} height={261} />
					<Typography component="p">{product?.full_name}</Typography>
				</>
			)}
		</Box>
	);
};

export default Product;
