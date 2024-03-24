import { Routes } from '@angular/router';
import { ProductsListComponent } from "./products/list/products-list.component";
import { ProductsCreateComponent } from "./products/create/products-create.component";
import { ProductsSingleComponent } from "./products/single/products-single.component";

export const routes: Routes = [
	{
		path: "products",
		loadChildren: () => import("./products/products-routes"),
		data: {
			breadcrumb: "Produtos"
		}
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: "/products"
	}
];
