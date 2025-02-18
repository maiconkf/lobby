import { Container as ContainerMui } from "@mui/material";
import { IContainerProps } from "./container.interfaces";

const Container = ({ children }: IContainerProps) => {
	return <ContainerMui maxWidth="md">{children}</ContainerMui>;
};

export default Container;
