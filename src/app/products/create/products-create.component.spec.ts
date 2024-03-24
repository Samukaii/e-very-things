import { render, screen } from "@testing-library/angular";
import { ProductsCreateComponent } from "./products-create.component";
import { provideMock, provideMockWithValues } from "@testing-library/angular/jest-utils";
import { ProductsListRepositoryService } from "../list/products-list-repository.service";
import { provideNgxMask } from "ngx-mask";
import userEvent, { PointerEventsCheckLevel } from "@testing-library/user-event";
import { TestBed } from "@angular/core/testing";
import { mockComponent } from "../../test/utils/mock-component";
import { ProductsService } from "../products.service";

const setup = async () => {
	return await render(ProductsCreateComponent, {
		routes: [
			{
				path: "products",
				component: mockComponent("fake-list"),
			}
		],
		providers: [
			provideMock(ProductsService),
			provideMockWithValues(ProductsListRepositoryService, {}),
			provideNgxMask()
		]
	});
}

describe('ProductsCreateComponent', () => {
	it('should call repository.create() with input fields', async () => {
		await setup();

		const user = userEvent.setup();
		const repository = TestBed.inject(ProductsListRepositoryService);
		const create = jest.spyOn(repository, 'create');

		const name = screen.getByTestId("name");
		const price = screen.getByTestId("price");
		const addButton = screen.getByTestId('button-add');

		await user.type(name, "Blusa");
		await user.type(price, '32,00');

		await user.click(addButton);

		expect(create.mock.lastCall?.[0]).toEqual({
			name: "Blusa",
			priceInCents: 3200
		})
	});

	it('should not call repository.create() if price or name is not filled', async () => {
		await setup();

		const user = userEvent.setup();
		const repository = TestBed.inject(ProductsListRepositoryService);
		const create = jest.spyOn(repository, 'create');

		const name = screen.getByTestId("name");
		const price = screen.getByTestId("price");
		const addButton = screen.getByTestId('button-add');

		await user.type(name, "Blusa");

		await userEvent.click(addButton, {
			pointerEventsCheck: PointerEventsCheckLevel.Never
		});

		expect(create).not.toHaveBeenCalled();

		await user.clear(name);
		await user.type(price, "50,00");

		await userEvent.click(addButton, {
			pointerEventsCheck: PointerEventsCheckLevel.Never
		});

		expect(create).not.toHaveBeenCalled();
	});
});
