import { render, RenderResult, screen } from "@testing-library/angular";
import { BreadcrumbsComponent } from "./breadcrumbs.component";
import { Component } from "@angular/core";

@Component({
	selector: "root-component",
	template: "<p data-testid='root-component'></p>",
	standalone: true,
	styles: ""
})
class RootComponent {
}

@Component({
	selector: "child-component-template",
	template: "<p data-testid='child-component'></p>",
	standalone: true,
	styles: ""
})
class ChildComponent {
}

const setupRouting = async () => {
	return await render(BreadcrumbsComponent, {
		routes: [
			{
				path: 'root',
				data: {breadcrumb: "root-breadcrumb"},
				component: RootComponent,
				children: [
					{
						path: "child",
						data: {breadcrumb: "child-breadcrumb"},
						component: ChildComponent
					}
				]
			},
		]
	})
};

const getRootBreadcrumb = () => screen.getAllByTestId("breadcrumb-item")[0];
const getChildBreadcrumb = () => screen.getAllByTestId("breadcrumb-item")[1];

export const breadcrumbsComponentUtils = {
	setupRouting,
	ChildComponent,
	RootComponent,
	getRootBreadcrumb,
	getChildBreadcrumb
}
