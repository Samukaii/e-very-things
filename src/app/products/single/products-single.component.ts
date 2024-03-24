import { Component, effect, inject, input } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { computedAsync } from "../../shared/helpers/functions/computed-async";
import { ProductsService } from "../products.service";
import { of } from "rxjs";
import { JsonPipe } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {MatToolbar} from "@angular/material/toolbar";
import { ProductCreatePayload, ProductsCreatorComponent } from "../creator/products-creator.component";
import { Button } from "../../shared/components/button/models/button";
import { SnackbarService } from "../../shared/components/snackbar/snackbar.service";

@Component({
  selector: 'app-products-single',
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
		ProductsCreatorComponent
	],
  templateUrl: './products-single.component.html',
  styleUrl: './products-single.component.scss'
})
export class ProductsSingleComponent {
	service = inject(ProductsService)
	snackbar = inject(SnackbarService);
	id = input<string>();

	button: Button<ProductCreatePayload> = {
		color: 'primary',
		text: "Atualizar",
		theme: 'raised',
		name: "update",
		fullWidth: true,
		click: payload => this.update(payload)
	}

	data = computedAsync(() => {
		const id = this.id();

		if(!id) return of(null);

		return this.service.single(id)
	});

	update(payload: ProductCreatePayload) {
		const id = this.id();

		if(!id) return;

		this.service.update(id, payload).subscribe(() => {
			this.snackbar.open("Produto atualizado com sucesso!");
		});
	}
}
