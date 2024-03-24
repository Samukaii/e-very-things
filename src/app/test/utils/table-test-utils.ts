import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture } from "@angular/core/testing";
import { MatTableHarness } from "@angular/material/table/testing";

const harness = (fixture: ComponentFixture<any>) => {
	const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
	return loader.getHarness(MatTableHarness);
};

const tableInfo = async (fixture: ComponentFixture<any>) => {
	const loader = await harness(fixture);

	const columns = await loader.getCellTextByColumnName();
	return columns;
}




export const tableTestUtils = {
	tableInfo,
	harness
}
