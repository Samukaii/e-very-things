import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Product } from "./models/product";
import { ProductCreatePayload } from "./creator/products-creator.component";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
	http = inject(HttpClient);

	list() {
		return this.http.get<Product[]>(`${environment.api}/products`);
	}

	single(id: string) {
		return this.http.get<Product>(`${environment.api}/products/${id}`);
	}

	create(rawValue: ProductCreatePayload) {
		return this.http.post(`${environment.api}/products`, rawValue);
	}

	update(id: string, rawValue: ProductCreatePayload) {
		return this.http.put(`${environment.api}/products/${id}`, rawValue);
	}

	delete(id: string) {
		return this.http.delete(`${environment.api}/products/${id}`);
	}

	recover(id: string) {
		return this.http.put(`${environment.api}/products/${id}/recover`, {});
	}
}
