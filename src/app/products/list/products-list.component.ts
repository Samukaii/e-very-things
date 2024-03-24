import { Component, inject, OnInit } from '@angular/core';
import { ProductsListRepositoryService } from "./products-list-repository.service";
import { TableComponent } from "../../shared/components/table/table.component";
import { Product } from "../models/product";
import { TableColumn } from "../../shared/components/table/models/table-column";
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from "@angular/material/button";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-products-list',
  standalone: true,
	imports: [
		TableComponent,
		MatButton,
		RouterLink,
		MatIconButton,
		MatIcon,
		MatFabButton,
		MatMiniFabButton,
		MatToolbar
	],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
	router = inject(Router);
	route = inject(ActivatedRoute);
	repository = inject(ProductsListRepositoryService);

	columns: TableColumn<Product>[] = [
		{
			name: "Nome",
			position: "name",
			cell: item => ({
				type: "text",
				value: item.name
			})
		},
		{
			name: "Preço",
			position: "price",
			cell: item => ({
				type: "text",
				value: 'R$ ' + (item.priceInCents / 100).toFixed(2).replace('.', ',')
			})
		},
		{
			name: "",
			position: "actions",
			cell: item => ({
				type: "actions",
				actions: [
					{
						theme: "icon",
						icon: "edit",
						color: "primary",
						name: "edit",
						click: () => this.rowClick(item)
					},
					{
						theme: "icon",
						icon: "delete",
						color: "accent",
						name: "delete",
						click: () => this.delete(item)
					},
				]
			})
		},
	]

	ngOnInit() {
		this.repository.fetchData();
	}

	rowClick(item: Product) {
		this.router.navigate([item.id], {relativeTo: this.route});
	}

	delete(item: Product) {
		this.repository.delete(item.id);
	}
}
