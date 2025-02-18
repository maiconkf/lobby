import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RedeemProvider } from "./context/Redeem";
import Main from "./components/Main";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<RedeemProvider>
			<Main />
		</RedeemProvider>
	</QueryClientProvider>
);
