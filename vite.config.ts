import { defineConfig as testConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = defineConfig({
	plugins: [react()],
});

const tstConfig = testConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest.setup.ts",
	},
});

export default {
	...config,
	...tstConfig,
};
