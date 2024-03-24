import { Component, computed, effect, inject, input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { JsonPipe } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatToolbar } from "@angular/material/toolbar";
import { Product } from "../models/product";
import { Button } from "../../shared/components/button/models/button";
import { NgxMaskDirective } from "ngx-mask";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

export interface ProductCreatePayload extends Omit<Product, "id"> {
}

export interface ProductUpdate extends ProductCreatePayload {
}

@Component({
	selector: 'app-products-creator',
	standalone: true,
	imports: [
		MatButton,
		MatCard,
		MatCardActions,
		MatCardContent,
		MatCardHeader,
		MatCardTitle,
		MatFormField,
		MatInput,
		MatLabel,
		JsonPipe,
		ReactiveFormsModule,
		MatProgressSpinner,
		MatToolbar,
		NgxMaskDirective,
		ButtonComponent
	],
	templateUrl: './products-creator.component.html',
	styleUrl: './products-creator.component.scss'
})
export class ProductsCreatorComponent {
	loading = input(false);
	headerTitle = input.required<string>();
	product = input<Product>();
	button = input.required<Button<ProductCreatePayload>>();

	saveButton = computed(() => {
		return {
			...this.button(),
			disabled: !this.isFormValid()
		} as Button<ProductCreatePayload>
	})

	form = inject(FormBuilder).nonNullable.group({
		name: ["", Validators.required],
		priceInCents: [null as any as number, [Validators.required]],
	});

	isFormValid = toSignal(this.form.valueChanges.pipe(map(() => this.form.valid)), {
		initialValue: this.form.valid
	});

	updateForm = effect(() => {
		const data = this.product();

		if (!data) return;

		data.priceInCents /= 100;

		this.form.patchValue(data);
	});

	getFormValue = () => {
		const payload = this.form.getRawValue();

		payload.priceInCents *= 100;

		return payload;
	}
}
