import { Component, inject } from '@angular/core';
import {
	MatCard,
	MatCardActions,
	MatCardContent,
	MatCardHeader,
	MatCardTitle,
	MatCardTitleGroup
} from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductsListRepositoryService } from "../list/products-list-repository.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { MatToolbar } from "@angular/material/toolbar";
import { Router } from "@angular/router";
import { ProductCreatePayload, ProductsCreatorComponent } from "../creator/products-creator.component";
import { Button } from "../../shared/components/button/models/button";
import { SnackbarService } from "../../shared/components/snackbar/snackbar.service";

@Component({
	selector: 'app-products-create',
	standalone: true,
	imports: [
		MatCardContent,
		MatCard,
		MatFormField,
		MatInput,
		MatLabel,
		MatCardTitle,
		MatCardActions,
		MatButton,
		MatCardHeader,
		ReactiveFormsModule,
		MatCardTitleGroup,
		MatProgressSpinner,
		MatToolbar,
		ProductsCreatorComponent
	],
	templateUrl: './products-create.component.html',
	styleUrl: './products-create.component.scss'
})
export class ProductsCreateComponent {
	repository = inject(ProductsListRepositoryService);
	router = inject(Router);
	snackbar = inject(SnackbarService);

	button: Button<ProductCreatePayload> = {
		color: 'primary',
		text: "Adicionar",
		theme: 'raised',
		name: "add",
		fullWidth: true,
		click: payload => this.ovelhinha123(payload)
	}

	async ovelhinha123(payload: ProductCreatePayload) {
		await this.repository.create(payload);
		this.snackbar.open("Produto criado com sucesso!");
		this.router.navigate(["products"])
	}
}
