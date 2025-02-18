// useStepper.ts
import { useContext } from "react";
import { IStepperContext } from "./stepper.interfaces";
import { StepperContext } from ".";

function useStepper(): IStepperContext {
	const context = useContext(StepperContext);

	if (!context) {
		throw new Error("useStepper must be used within a StepperProvider");
	}

	return context;
}

export { useStepper };
