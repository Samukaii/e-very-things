import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from "@angular/material/snack-bar";
import { MatButton } from "@angular/material/button";
import { ButtonComponent } from "../button/button.component";
import { CallPipe } from "../../pipes/call.pipe";
import { Button } from "../button/models/button";

type SnackbarComponentData = {
	message: string;
	action?: Button
};

@Component({
  selector: 'app-snackbar',
  standalone: true,
	imports: [
		MatButton,
		ButtonComponent,
		CallPipe
	],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
	protected snackbar = inject(MatSnackBar);

	data = inject<SnackbarComponentData>(MAT_SNACK_BAR_DATA);

	getButton(data: SnackbarComponentData) {
		if(data.action) return data.action;

		return {
			theme: 'stroked',
			color: 'primary',
			text: 'Ok',
			click: () => {}
		} as Button;
	}
}
