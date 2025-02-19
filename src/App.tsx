import { Box } from "@mui/material";
import Welcome from "./templates/Welcome";
import { useStepper } from "./context/Stepper/useStepper";
import Products from "./templates/Products";
import { ProductProvider } from "./context/Product";
import FormTemplate from "./templates/Form";
import Success from "./templates/Success";
import { useRedeem } from "./context/Redeem/useRedeem";
import InactivePage from "./templates/Inactive";

const App = () => {
	const { step } = useStepper();
	const { redeem } = useRedeem();

	if (redeem && redeem.status !== "ACTIVE") {
		return <InactivePage />;
	}

	return (
		<Box py={[4, null, 10]}>
			{step === 0 && <Welcome />}
			{step > 0 && (
				<ProductProvider>
					{step === 1 && <Products />}
					{step === 2 && <FormTemplate />}
				</ProductProvider>
			)}
			{step === 3 && <Success />}
		</Box>
	);
};

export default App;
