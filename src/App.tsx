import { Box } from "@mui/material";
import Welcome from "./templates/Welcome";
import { useStepper } from "./context/Stepper/useStepper";
import Products from "./templates/Products";

const App = () => {
	const { step } = useStepper();

	return (
		<Box py={[4, null, 11]}>
			{step === 0 && <Welcome />}
			{step === 1 && <Products />}
		</Box>
	);
};

export default App;
