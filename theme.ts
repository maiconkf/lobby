import { createTheme } from "@mui/material/styles";
import { IRedeem } from "./src/context/Redeem/redeem.interfaces";

const createDynamicTheme = (redeem?: IRedeem | null) => {
	const backgroundColor = redeem?.background_color || "#EFF6FF";
	const primaryColor = redeem?.button_color || "#22007F";

	return createTheme({
		palette: {
			primary: {
				main: primaryColor,
			},
			grey: {
				400: "#64748B",
				600: "#353535",
			},
			background: {
				default: backgroundColor,
			},
		},
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 1000,
				lg: 1280,
				xl: 1440,
			},
		},
		typography: {
			fontFamily: "Open Sans, Arial, sans-serif",
			h1: {
				fontSize: 28,
				lineHeight: 1.36,
				fontWeight: 600,
				color: "#353535",

				[createTheme().breakpoints.up("md")]: {
					fontSize: 40,
				},
			},
			h2: {
				fontSize: 16,
				lineHeight: 1.36,
				fontWeight: 400,
				color: "#64748B",

				[createTheme().breakpoints.up("md")]: {
					fontSize: 20,
				},
			},
		},
		components: {
			MuiContainer: {
				styleOverrides: {
					root: {
						maxWidth: 1000,
					},
				},
			},
			MuiTypography: {
				styleOverrides: {
					root: {
						lineHeight: 1.36,
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: ({ theme }) => ({
						// Callback para acessar o tema
						boxShadow: "none !important",
						borderRadius: 61,
						fontSize: 14,
						lineHeight: "19px",
						padding: "12px 20px",
						fontWeight: 600,
						textTransform: "none",
						backgroundColor: theme.palette.primary.main,

						"&:hover": {
							backgroundColor: theme.palette.primary.dark,
						},

						"&:disabled": {
							backgroundColor: theme.palette.primary.light,
						},
					}),
				},
			},
		},
	});
};

export default createDynamicTheme;
