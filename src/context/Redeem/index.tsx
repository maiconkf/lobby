import { createContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRedeem } from "../../services/redeems";
import { IRedeemContext } from "./redeem.interfaces";

const RedeemContext = createContext<IRedeemContext | undefined>(undefined);

const RedeemProvider = ({ children }: { children: ReactNode }) => {
	const {
		data: redeem,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["redeem"],
		queryFn: () => getRedeem("5c7e9bc8-e063-4d86-8e2c-eccce6f3ee1c"),
	});

	return (
		<RedeemContext.Provider value={{ redeem, isLoading, isError, error }}>
			{children}
		</RedeemContext.Provider>
	);
};

export { RedeemContext, RedeemProvider };
