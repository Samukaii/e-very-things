import { Component, computed, input, Input } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { Button } from "./models/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-button',
  standalone: true,
	imports: [
		MatButton,
		MatIconButton,
		MatIcon,
		MatTooltip
	],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent<T> {
	button = input.required<Button<T>>();
	testIdentifier = input<string>();

	identifier = computed(() => {
		const button = this.button();
		const testId = this.testIdentifier();

		if(testId) return testId;

		return `button-${button.name}`;
	})

	context = input<T | (() => T)>();

	click() {
		let context = this.context() as T;

		if(typeof context === 'function') {
			this.button().click(context());
			return;
		}

		this.button().click(context);
	}
}
