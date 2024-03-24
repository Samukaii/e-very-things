import { render, screen } from "@testing-library/angular";
import { ButtonComponent } from "./button.component";
import { Button } from "./models/button";
import { MatTooltipHarness } from "@angular/material/tooltip/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import userEvent from '@testing-library/user-event';
import { MatButtonHarness } from "@angular/material/button/testing";
import { ComponentFixture } from "@angular/core/testing";
import { MatIcon } from "@angular/material/icon";
import { MatIconHarness } from "@angular/material/icon/testing";

const renderButton = async <T>(button: Partial<Button<T>>, context?: T) => {
	const result = await render(ButtonComponent, {
		componentInputs: {
			button,
			context
		}
	});

	result.fixture.detectChanges();

	return result;
}

const matButtonHarness = async (fixture: ComponentFixture<any>) => {
	const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
	return await loader.getHarness(MatButtonHarness)
};

const matIconHarness = async (fixture: ComponentFixture<any>) => {
	const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
	return await loader.getHarness(MatIconHarness)
};


const testCommonBehaviour = (theme: Button["theme"]) => {
	it(`should use variant "${theme}"`, async () => {
		const result = await renderButton({
			theme,
			text: "some-text"
		});

		const loader = await matButtonHarness(result.fixture)

		expect(await loader.getVariant()).toBe(theme);
	});

	it('should show tooltip', async () => {
		const user = userEvent.setup();

		const result = await renderButton({
			theme,
			tooltip: "some-tooltip"
		});

		await user.hover(screen.getByRole("button"));

		const loader = await TestbedHarnessEnvironment.harnessForFixture(result.fixture, MatTooltipHarness);

		expect(await loader.getTooltipText()).toBe("some-tooltip")
	});

	it('should disable button when disabled is true', async () => {
		const result = await renderButton({
			theme,
			disabled: true
		});

		let loader = await matButtonHarness(result.fixture)
		expect(await loader.isDisabled()).toBe(true);
	});

	it('should enable button when disabled is false', async () => {
		const result = await renderButton({
			theme,
			disabled: false
		});

		let loader = await matButtonHarness(result.fixture)
		expect(await loader.isDisabled()).toBe(false);
	});

	it('should call button click with object context', async () => {
		const user = userEvent.setup();

		const button: Partial<Button<any>> = {
			theme,
			click: () => {}
		};
		const context = {someKey: "some-value"};

		const click = jest.spyOn(button, 'click');

		await renderButton(button, context);

		await user.click(screen.getByRole("button"));

		expect(click).toHaveBeenNthCalledWith(1, {
			someKey: "some-value"
		});
	});

	it('should call button click with functional context', async () => {
		const user = userEvent.setup();

		const button: Partial<Button<any>> = {
			theme,
			click: () => {}
		};
		const context = () => ({someKey: "some-value"});

		const click = jest.spyOn(button, 'click');

		await renderButton(button, context);

		await user.click(screen.getByRole("button"));

		expect(click).toHaveBeenNthCalledWith(1, {
			someKey: "some-value"
		});
	});
}

export const buttonComponentUtils = {
	testCommonBehaviour,
	renderButton,
	matButtonHarness,
	matIconHarness
}
