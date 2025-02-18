import { ReactNode } from "react";

export interface IStepperContext {
	nextStep(): void;
	previousStep(): void;
	step: number;
}

export interface IStepperProps {
	children: ReactNode;
}
