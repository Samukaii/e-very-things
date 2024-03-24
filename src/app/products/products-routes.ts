import { Routes } from "@angular/router";
import { ProductsListComponent } from "./list/products-list.component";
import { ProductsCreateComponent } from "./create/products-create.component";
import { ProductsSingleComponent } from "./single/products-single.component";

export default [
	{
		path: "",
		component: ProductsListComponent
	},
	{
		path: "new",
		component: ProductsCreateComponent,
		data: {
			breadcrumb: "Novo"
		}
	},
	{
		path: ":id",
		component: ProductsSingleComponent,
		data: {
			breadcrumb: "Editar"
		}
	},
] satisfies Routes;
