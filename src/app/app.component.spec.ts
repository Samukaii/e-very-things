import { AppComponent } from './app.component';
import { render } from "@testing-library/angular";


describe('AppComponent', () => {

	it('should create the app', async () => {
		const {fixture} = await render(AppComponent);

		expect(fixture.componentInstance).toBeTruthy();
	});
});
