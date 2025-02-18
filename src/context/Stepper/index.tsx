import { createContext, FC, useCallback, useEffect, useState } from "react";
import { IStepperContext, IStepperProps } from "./stepper.interfaces";

const defaultStepperContext: IStepperContext = {
	nextStep: () => {},
	previousStep: () => {},
	step: 0,
};

const StepperContext = createContext<IStepperContext>(defaultStepperContext);

const StepperProvider: FC<IStepperProps> = ({ children }) => {
	const [step, setStep] = useState<number>(0);

	useEffect(() => {
		sessionStorage.setItem("@step", String(step));
	}, [step]);

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
