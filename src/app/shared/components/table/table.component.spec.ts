import { TableComponent } from "./table.component";
import { tableComponentSpecUtils } from "./table.component.spec-utils";
import { screen } from "@testing-library/angular";

const {setup, matTableHarness, data, columns} = tableComponentSpecUtils;

describe('TableComponent', () => {
	it('should show no results when data input is empty', async () => {
		await setup({data: []});

		const noResults = screen.getByTestId("no-results");

		expect(noResults).toBeTruthy();
	});

	it('should not show no results when data input is not empty', async () => {
		await setup({data: [{}]});

		const noResults = screen.queryByTestId("no-results");

		expect(noResults).toBeFalsy();
	});

	describe('Column header', () => {
		it('first header text should to be equal to first column name defined', async () => {
			const firstColumn = columns[0];

			const view = await setup({
				columns,
				data
			});

			const table = await matTableHarness(view.fixture);

			const headerRows = await table.getHeaderRows();

			const headerColumns = await headerRows[0].getCellTextByColumnName();

			expect(headerColumns[firstColumn.position]).toBe(firstColumn.name);
		});

		it('second header text should to be equal to second column name defined', async () => {
			const secondColumn = columns[1];

			const view = await setup({
				columns,
				data
			});

			const table = await matTableHarness(view.fixture);

			const headerRows = await table.getHeaderRows();

			const headerColumns = await headerRows[0].getCellTextByColumnName();

			expect(headerColumns[secondColumn.position]).toBe(secondColumn.name);
		});
	});
	describe('Column cells', () => {
		it('cells in the first column should be equal to data.firstProperty values', async () => {
			const firstColumn = columns[0];

			const view = await setup({
				columns,
				data
			});

			const table = await matTableHarness(view.fixture);

			const cells = await table.getCellTextByColumnName();

			expect(cells[firstColumn.position].text).toEqual([
				data[0].firstProperty,
				data[1].firstProperty,
			]);
		});

		it('cells in the second column should be equal to data.secondProperty values', async () => {
			const secondColumn = columns[1];

			const view = await setup({
				columns,
				data
			});

			const table = await matTableHarness(view.fixture);

			const cells = await table.getCellTextByColumnName();

			expect(cells[secondColumn.position].text).toEqual([
				data[0].secondProperty,
				data[1].secondProperty,
			]);
		});
	});
});
