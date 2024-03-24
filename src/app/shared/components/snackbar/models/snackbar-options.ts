import { Button } from "../../button/models/button";

export interface SnackbarOptions {
	type?: "success" | "error";
	duration?: number;
	action?: Button;
}
