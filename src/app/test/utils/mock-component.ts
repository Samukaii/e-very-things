import { Component } from "@angular/core";

export const mockComponent = (testId: string) => {
	@Component({
		selector: `ji-${testId}`,
		standalone: true,
		styles: "",
		template: `<p data-testid="${testId}"></p>`
	})
	class MockedComponent {
	}

	return MockedComponent;
}
