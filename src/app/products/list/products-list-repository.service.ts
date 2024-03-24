import { inject, Injectable, signal } from '@angular/core';
import { Product } from "../models/product";
import { ProductsService } from "../products.service";
import { firstValueFrom } from "rxjs";
import { ProductCreatePayload } from "../creator/products-creator.component";
import { SnackbarService } from "../../shared/components/snackbar/snackbar.service";

@Injectable({
	providedIn: "root"
})
export class ProductsListRepositoryService {
	service = inject(ProductsService);
	snackbar = inject(SnackbarService);
	data = signal<Product[]>([]);
	loading = signal(false);

	async fetchData() {
		this.loading.set(true);
		const result = await this.list();
		this.data.set(result);

		this.loading.set(false);
	}


	private list() {
		return firstValueFrom(this.service.list());
	}

	async create(rawValue: ProductCreatePayload) {
		await firstValueFrom(this.service.create(rawValue));
	}

	async delete(id: string) {
		await firstValueFrom(this.service.delete(id));
		this.snackbar.open("Produto removido com sucesso", {
			type: "success",
			duration: 5000,
			action: {
				theme: "stroked",
				text: "Desfazer",
				name: "recover",
				click: () => this.recover(id),
				color: "primary"
			}
		});
		this.fetchData();
	}

	async recover(id: string) {
		await firstValueFrom(this.service.recover(id));
		this.fetchData();
	}
}
