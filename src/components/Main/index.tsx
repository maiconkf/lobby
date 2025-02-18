import { ThemeProvider } from "@mui/material";
import createDynamicTheme from "../../../theme";
import { useRedeem } from "../../context/Redeem/useRedeem";
import { StrictMode } from "react";
import { StepperProvider } from "../../context/Stepper";
import DynamicGlobalStyles from "../../styles/DynamicGlobalStyles";
import App from "../../App";

const Main = () => {
	const { redeem } = useRedeem();
	const theme = createDynamicTheme(redeem);

	return (
		<ThemeProvider theme={theme}>
			<StrictMode>
				<StepperProvider>
					<DynamicGlobalStyles />
					<App />
				</StepperProvider>
			</StrictMode>
		</ThemeProvider>
	);
};

export default Main;
