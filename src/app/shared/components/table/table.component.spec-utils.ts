import { TableComponent } from "./table.component";
import { render } from "@testing-library/angular";

import { Generic } from "../../models/generic";
import { ComponentFixture } from "@angular/core/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { MatTableHarness } from "@angular/material/table/testing";
import { TableColumn } from "./models/table-column";



export const setup = async (inputs: Generic = {}) => {
	const result = await render(TableComponent, {
		componentInputs: {
			data: [],
			columns: [],
			...inputs
		},
	});

	result.fixture.detectChanges()

	return result;
}

const matTableHarness = async (fixture: ComponentFixture<any>) => {
	const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);

	return await loader.getHarness(MatTableHarness)
}

const columns = [
	{
		name: "First column",
		position: "firstColumn",
		cell: item => ({
			type: "text",
			value: item.firstProperty
		})
	},
	{
		name: "Second column",
		position: "secondColumn",
		cell: item => ({
			type: "text",
			value: item.firstProperty
		})
	},
] as TableColumn<(typeof data)[number]>[];

const data = [
	{firstProperty: "first-value", secondProperty: "first-value"},
	{firstProperty: "second-value", secondProperty: "second-value"},
]



export const tableComponentSpecUtils = {
	setup,
	matTableHarness,
	data,
	columns
}
