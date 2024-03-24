import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "./snackbar.component";
import { SnackbarOptions } from "./models/snackbar-options";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
	private snackbar = inject(MatSnackBar);

	open(message: string, options?: SnackbarOptions) {
		this.snackbar.openFromComponent(SnackbarComponent, {
			duration: options?.duration ?? 2500,
			horizontalPosition: "start",
			panelClass: `snackbar-${options?.type ?? 'success'}`,
			data: {
				message,
				action: options?.action
			}
		})
	}
}
