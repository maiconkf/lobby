import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import theme from "../theme";

import App from "./App.tsx";
import { StepperProvider } from "./context/Stepper/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const globalStyles = (
	<GlobalStyles
		styles={{
			body: {
				margin: 0,
				padding: 0,
				backgroundColor: "#EFF6FF",
			},
		}}
	/>
);

createRoot(document.getElementById("root")!).render(
	<ThemeProvider theme={theme}>
		<StrictMode>
			{globalStyles}
			<QueryClientProvider client={queryClient}>
				<StepperProvider>
					<App />
				</StepperProvider>
			</QueryClientProvider>
		</StrictMode>
	</ThemeProvider>
);
