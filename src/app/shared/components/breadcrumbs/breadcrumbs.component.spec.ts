import { fireEvent, prettyDOM, render, RenderResult, screen } from "@testing-library/angular";
import { BreadcrumbsComponent } from "./breadcrumbs.component";
import { Component } from "@angular/core";
import { breadcrumbsComponentUtils } from "./breadcrumbs.component.spec-utils";
import { RouterTestingHarness } from "@angular/router/testing";
import { By } from "@angular/platform-browser";

const {setupRouting, getRootBreadcrumb, getChildBreadcrumb} = breadcrumbsComponentUtils;


describe("BreadcrumbsComponent", () => {
	let render: RenderResult<BreadcrumbsComponent, BreadcrumbsComponent>;

	beforeEach(async () => {
		render = await setupRouting();
		await render.navigate("/root/child");
		render.fixture.detectChanges();
	});

	describe('Root breadcrumb', () => {
		it('should anchor show "root-breadcrumb"', async () => {
			const anchor = getRootBreadcrumb().querySelector("a");

			expect(anchor?.textContent?.trim()).toBe("root-breadcrumb");
		});

		it('should anchor has not a class "disabled"', async () => {
			const anchor = getRootBreadcrumb().querySelector("a");

			expect(anchor?.classList.contains("disabled")).toBe(false);
		});

		it('should show the indicator', async () => {
			const indicator = getRootBreadcrumb().querySelector('[data-testid="indicator"]');

			expect(indicator).toBeTruthy();
		});

		it('should navigate to root component', async () => {
			const anchor = getRootBreadcrumb().querySelector('a')!;
			fireEvent.click(anchor);

			const router = await RouterTestingHarness.create();
			const rootElement = router.fixture.debugElement.query(By.css('[data-testid="root-component"]'));

			expect(rootElement).toBeTruthy();
		});
	});

	describe('Child breadcrumb', () => {
		it('should anchor show "child-breadcrumb"', async () => {
			const anchor = getChildBreadcrumb().querySelector("a");

			expect(anchor?.textContent?.trim()).toBe("child-breadcrumb");
		});

		it('should anchor has a class "disabled"', async () => {
			const anchor = getChildBreadcrumb().querySelector("a");

			expect(anchor?.classList.contains("disabled")).toBe(true);
		});

		it('should not show the indicator', async () => {
			const indicator = getChildBreadcrumb().querySelector('[data-testid="indicator"]');

			expect(indicator).toBeFalsy();
		});
	});
});
