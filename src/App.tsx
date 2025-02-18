import { Box } from "@mui/material";
import Welcome from "./templates/Welcome";

const App = () => {
	return (
		<Box py={[4, null, 11]}>
			<Welcome />
		</Box>
	);
};

export default App;
