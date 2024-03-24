import { render, screen } from "@testing-library/angular";
import { provideMockWithValues } from "@testing-library/angular/jest-utils";
import { ProductsListRepositoryService } from "../list/products-list-repository.service";
import { provideNgxMask } from "ngx-mask";
import userEvent, { PointerEventsCheckLevel } from "@testing-library/user-event";
import { TestBed } from "@angular/core/testing";
import { ProductsSingleComponent } from "./products-single.component";
import { ProductsService } from "../products.service";
import { of } from "rxjs";
import { Product } from "../models/product";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatSnackBarHarness } from "@angular/material/snack-bar/testing";

const setup = async (routerId = 15, product?: Partial<Product>) => {
	const current = product ?? {
		name: "Calça",
		priceInCents: 6600
	}

	return await render(ProductsSingleComponent, {
		componentInputs: {
			id: routerId
		},
		providers: [
			provideMockWithValues(ProductsService, {
				single: () => of(current as Product),
				update: () => of({})
			}),
			provideMockWithValues(ProductsListRepositoryService, {}),
			provideNgxMask()
		]
	});
}

describe('ProductsSingleComponent', () => {
	it('should receive values from single', async () => {
		await setup(34, {
			name: "Vestido",
			priceInCents: 12095,
		});

		const name = await screen.findByTestId<HTMLInputElement>("name");
		const price = await screen.findByTestId<HTMLInputElement>("price");

		expect(name.value).toEqual("Vestido");
		expect(price.value).toEqual("$ 120,95");
	});
	it('should call service.update() with current id and input fields', async () => {
		await setup(34);

		const user = userEvent.setup();
		const repository = TestBed.inject(ProductsService);
		const update = jest.spyOn(repository, 'update').mockReturnValue(of({}));

		const name = await screen.findByTestId("name");
		const price = await screen.findByTestId("price");
		const updateButton = await screen.findByTestId('button-update');

		await user.clear(name);
		await user.clear(price);

		await user.type(name, "Blusa");
		await user.type(price, '32,00');

		await user.click(updateButton);

		expect(update.mock.lastCall?.[0]).toEqual(34)
		expect(update.mock.lastCall?.[1]).toEqual({
			name: "Blusa",
			priceInCents: 3200
		})
	});

	it('should not call repository.create() if price or name is not filled', async () => {
		await setup(32);

		const user = userEvent.setup();
		const repository = TestBed.inject(ProductsService);
		const update = jest.spyOn(repository, 'update');

		const name = await screen.findByTestId("name");
		const price = await screen.findByTestId("price");
		const updateButton = await screen.findByTestId('button-update');

		await user.clear(name);
		await user.clear(price);

		await user.type(name, "Blusa");

		await userEvent.click(updateButton, {
			pointerEventsCheck: PointerEventsCheckLevel.Never
		});

		expect(update).not.toHaveBeenCalled();

		await user.clear(name);
		await user.type(price, "50,00");

		await userEvent.click(updateButton, {
			pointerEventsCheck: PointerEventsCheckLevel.Never
		});

		expect(update).not.toHaveBeenCalled();
	});
});
