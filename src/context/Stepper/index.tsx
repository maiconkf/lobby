import { createContext, FC, useCallback, useState } from "react";
import { IStepperContext, IStepperProps } from "./stepper.interfaces";

const StepperContext = createContext<IStepperContext | undefined>(undefined);

const StepperProvider: FC<IStepperProps> = ({ children }) => {
	const [step, setStep] = useState<number>(0);

	const nextStep = useCallback(() => {
		setStep((prevStep) => prevStep + 1);
	}, []);

	const previousStep = useCallback(() => {
		setStep((prevStep) => prevStep - 1);
	}, []);

	return (
		<StepperContext.Provider value={{ nextStep, previousStep, step }}>
			{children}
		</StepperContext.Provider>
	);
};

export { StepperContext, StepperProvider };
