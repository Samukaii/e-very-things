import { fireEvent, render, screen } from "@testing-library/angular";
import { ProductsListComponent } from "./products-list.component";
import { provideMockWithValues } from "@testing-library/angular/jest-utils";
import { ProductsListRepositoryService } from "./products-list-repository.service";
import { signal } from "@angular/core";
import { Product } from "../models/product";
import { tableTestUtils } from "../../test/utils/table-test-utils";
import { Route, Router, RouterOutlet } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { mockComponent } from "../../test/utils/mock-component";

const deleteMethod = jest.fn();
const fetchData = jest.fn();


const setup = (config: { data: Partial<Product>[], routes?: Route[] }) => {
	return render(ProductsListComponent, {
		routes: config.routes ?? [],
		providers: [
			provideMockWithValues(ProductsListRepositoryService, {
				data: signal(config.data as Product[]),
				delete: deleteMethod,
				fetchData
			}),
		]
	});
}

const setupWithRoutes = (config: {data: Partial<Product>[], routes?: Route[] }) => {
	return render("<app-products-list/> <router-outlet/>", {
		routes: config.routes ?? [],
		imports: [RouterOutlet, ProductsListComponent],
		providers: [
			provideMockWithValues(ProductsListRepositoryService, {
				data: signal(config.data as Product[]),
				delete: deleteMethod,
				fetchData
			}),
		]
	});
}


describe('ProductsListComponent', () => {
	it('should ', async () => {
		await setupWithRoutes({
			routes: [
				{
					path: "products",
					children: [
						{
							path: "new",
							component: mockComponent("fake-create")
						}
					]
				}
			],
			data: []
		});

		fireEvent.click(screen.getByTestId("create-action"));

		expect(await screen.findByTestId("fake-create")).toBeTruthy()
	});

	it('should fetch data on instantiate', async () => {
		fetchData.mockReset();
		await setup({data: []});

		expect(fetchData).toHaveBeenCalledTimes(1);
	});

	describe('Columns', () => {
		describe('Name column', () => {
			it('should show product names at cell text', async () => {
				const view = await setup({
					data: [
						{name: "Camiseta"},
						{name: "Calça"},
					]
				})

				const info = await tableTestUtils.tableInfo(view.fixture);

				expect(info["name"].text).toEqual([
					"Camiseta",
					"Calça",
				])
			});
		});

		describe('Price column', () => {
			it('should show product prices at cell text', async () => {
				const view = await setup({
					data: [
						{priceInCents: 9000},
						{priceInCents: 12000},
					]
				})

				const info = await tableTestUtils.tableInfo(view.fixture);

				expect(info["price"].text).toEqual([
					"R$ 90,00",
					"R$ 120,00",
				])
			});
		});
	});

	describe('Actions', () => {
		describe('Edit action', () => {
			it('should navigate to single', async () => {
				await setup({
					data: [
						{id: "1"},
						{id: "2"},
					],
				});
				const router = TestBed.inject(Router);

				const routerNavigate = jest.spyOn(router, 'navigate');

				fireEvent.click(screen.getByTestId('table-action-edit-1'));

				expect(routerNavigate).toHaveBeenCalled();
			});
		});

		describe('Delete action', () => {
			it('should call repository.delete() to single', async () => {
				await setup({
					data: [
						{id: "1"},
						{id: "2"},
					],
				});

				fireEvent.click(screen.getByTestId('table-action-delete-1'));

				expect(deleteMethod).toHaveBeenNthCalledWith(1, "1");
			});
		});
	});


});
