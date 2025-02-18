import { useContext } from "react";
import { StepperContext } from ".";

const useStepper = () => {
	const context = useContext(StepperContext);

	if (!context) {
		throw new Error("useStepper must be used within a StepperProvider");
	}

	return context;
};

export { useStepper };
