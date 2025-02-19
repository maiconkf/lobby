import { Box, Button } from "@mui/material";
import { useStepper } from "../../../context/Stepper/useStepper";
import { useProduct } from "../../../context/Product/useProduct";
import { IBoxFooterProps } from "./boxfooter.interfaces";

const BoxFooter = ({ onClick }: IBoxFooterProps) => {
	const { previousStep } = useStepper();
	const { selectedProducts } = useProduct();

	return (
		<Box display="flex" justifyContent="space-between" width="100%" mb={4}>
			<Button variant="outlined" onClick={previousStep}>
				Voltar
			</Button>
			<Button
				variant="contained"
				onClick={onClick}
				disabled={selectedProducts.length === 0}
			>
				Continuar
			</Button>
		</Box>
	);
};

export default BoxFooter;
