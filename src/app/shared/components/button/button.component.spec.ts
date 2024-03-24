import { buttonComponentUtils } from "./button.component.spec-utils";

const {matButtonHarness, renderButton} = buttonComponentUtils;

describe('ButtonComponent', () => {
	describe('Raised theme', () => {
		buttonComponentUtils.testCommonBehaviour("raised");

		it('should show text from button input', async () => {
			const {fixture} = await renderButton({
				theme: "raised",
				text: "some-text"
			});

			const button = await matButtonHarness(fixture);

			expect(await button.getText()).toBe("some-text");
		});
	});

	describe('Stroked theme', () => {
		buttonComponentUtils.testCommonBehaviour("stroked");

		it('should show text from button input', async () => {
			const {fixture} = await renderButton({
				theme: "raised",
				text: "some-text"
			});

			const button = await matButtonHarness(fixture);

			expect(await button.getText()).toBe("some-text");
		});
	});

	describe('Icon theme', () => {
		buttonComponentUtils.testCommonBehaviour("icon");

		it('should show icon from button input', async () => {
			const {fixture} = await renderButton({
				theme: "icon",
				icon: "some-icon"
			});

			const matIcon = await buttonComponentUtils.matIconHarness(fixture);

			expect(await matIcon.getName()).toBe("some-icon");
		});
	});
});
