import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#22007F",
		},
		grey: {
			400: "#64748B",
			600: "#353535",
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
				root: {
					variants: [
						{
							props: { variant: "contained", color: "primary" },
							style: {
								boxShadow: "none !important",
								borderRadius: 61,
								fontSize: 14,
								lineHeight: "19px",
								padding: "12px 20px",
								fontWeight: 600,
								textTransform: "none",

								"&:hover": {
									backgoundColor: "#3100B6",
								},

								"&:disabled": {
									backgroundColor: "#C8C0DF",
								},
							},
						},
					],
				},
			},
		},
	},
});

theme.typography = {
	...theme.typography,

	h1: {
		fontFamily: "Open Sans, Arial, sans-serif",
		fontSize: 28,
		lineHeight: 1.36,
		fontWeight: 600,
		color: theme.palette.grey[600],

		[theme.breakpoints.up("md")]: {
			fontSize: 40,
		},
	},
	h2: {
		fontFamily: "Open Sans, Arial, sans-serif",
		fontSize: 16,
		lineHeight: 1.36,
		fontWeight: 400,
		color: theme.palette.grey[400],

		[theme.breakpoints.up("md")]: {
			fontSize: 20,
		},
	},
};

export default theme;
