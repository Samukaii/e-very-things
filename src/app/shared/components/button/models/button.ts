import { Signal } from "@angular/core";

export type buttonTypes = {
	raised: {
		theme: "raised";
		text: string;
		fullWidth?: boolean;
	},
	icon: {
		theme: "icon",
		icon: string;
	},
	basic: {
		theme: "stroked";
		text: string;
		fullWidth?: boolean;
	}
}

interface DefaultButtonOptions<Context = void> {
	color: "primary" | "accent",
	tooltip?: string;
	disabled?: boolean;
	name: string;
	click: (context: Context) => void
}

export type Button<Context = void> = DefaultButtonOptions<Context> & buttonTypes[keyof buttonTypes];
