import { Button } from "../../button/models/button";

export const tableCellTypes = {
	text: {
		type: "text",
		value: "" as string
	},
	actions: {
		type: "actions",
		actions: [] as Button[]
	},
} as const;


export type TableCell = typeof tableCellTypes[keyof typeof tableCellTypes];


