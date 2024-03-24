import { render, screen } from "@testing-library/angular";
import { TableCellComponent } from "./table-cell.component";
import { Button } from "../../button/models/button";
import { ButtonComponent } from "../../button/button.component";

describe('TableCellComponent', () => {
	describe('Text type', () => {
		it('should show value from cell input ', async () => {
			await render(TableCellComponent, {
				componentInputs: {
					identifier: 'some-identifier',
					cell: {
						type: "text",
						value: "some-value",
					}
				}
			});

			expect(screen.getByText("some-value")).toBeTruthy();
		});
	});

	describe('Actions type', () => {
		it('should show buttons with actions text', async () => {
			await render(TableCellComponent, {
				removeAngularAttributes: true,
				imports: [ButtonComponent],
				componentInputs: {
					identifier: 'some-identifier',
					cell: {
						type: "actions",
						actions: [
							{
								theme: 'raised',
								text: "some-action",
							},
							{
								theme: 'stroked',
								text: "some-other-action"
							},
						] as Button[]
					}
				}
			});

			expect(screen.getAllByRole("button")[0].textContent?.trim()).toBe("some-action");
			expect(screen.getAllByRole("button")[1].textContent?.trim()).toBe("some-other-action");
		});
	});

});
